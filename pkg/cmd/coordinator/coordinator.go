package coordinator

import (
	"context"
	"errors"
	"fmt"
	"net"

	coordinatorv1 "github.com/nhan-ng/openpuz/gen/go/coordinator/v1"

	agonesv1 "agones.dev/agones/pkg/apis/agones/v1"
	allocationv1 "agones.dev/agones/pkg/apis/allocation/v1"
	"agones.dev/agones/pkg/client/clientset/versioned"
	"agones.dev/agones/pkg/util/runtime" // for the logger
	"go.uber.org/zap"
	"google.golang.org/grpc"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/rest"
)

// Serve creates a new gRPC server the coordinator.
func Serve(port int) error {
	logger, _ := zap.NewDevelopment()

	// Initialize the agones clientset
	grpcServer := grpc.NewServer()
	coordinatorv1.RegisterCoordinatorAPIServer(grpcServer, &coordinatorAPIServer{
		agonesClient: getAgonesClient(),
	})
	logger.Info("Created gRPC server")

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		return fmt.Errorf("unable to create a tcp listener %d: %w", port, err)
	}
	logger.Info("Listening on port", zap.Int("port", port))

	return grpcServer.Serve(lis)
}

type coordinatorAPIServer struct {
	fleetName    string
	namespace    string
	agonesClient versioned.Interface
}

const (
	// GameTypeLabel is the Kubernetes label for GameServer pod
	GameTypeLabel        = "openpuz.io/gametype"
	namespace     string = "default"
)

var (
	logger                      = runtime.NewLoggerWithSource("main")
	allocationStatusUnAllocated = allocationv1.GameServerAllocationStatus{State: allocationv1.GameServerAllocationUnAllocated}
)

func (c *coordinatorAPIServer) CreateLobby(ctx context.Context, request *coordinatorv1.CreateLobbyRequest) (*coordinatorv1.CreateLobbyResponse, error) {
	logger.Infof("Received CreateLobbyRequest: %v", request)
	gsStatus, err := c.allocate(request)
	if err != nil {
		return nil, fmt.Errorf("cannot allocate the game server: %w", err)
	}

	// Prepare the response
	response := &coordinatorv1.CreateLobbyResponse{
		Lobby: &coordinatorv1.Lobby{
			Name:     gsStatus.GameServerName,
			Address:  gsStatus.Address,
			GameType: request.GetGameType(),
			NodeName: gsStatus.NodeName,
		},
	}
	for _, port := range gsStatus.Ports {
		response.Lobby.Ports = append(response.Lobby.Ports, &coordinatorv1.LobbyPort{
			Name: port.Name,
			Port: port.Port,
		})
	}

	return response, nil
}

func getAgonesClient() *versioned.Clientset {
	config, err := rest.InClusterConfig()
	if err != nil {
		logger.WithError(err).Fatal("Could not create in cluster config")
	}

	// Access to the Agones resources through the Agones Clientset
	agonesClient, err := versioned.NewForConfig(config)
	if err != nil {
		logger.WithError(err).Fatal("Could not create the agones api clientset")
	} else {
		logger.Info("Created the agones api clientset")
	}

	return agonesClient
}

func (c *coordinatorAPIServer) allocate(request *coordinatorv1.CreateLobbyRequest) (allocationv1.GameServerAllocationStatus, error) {
	logger.WithField("namespace", c.namespace).Info("namespace for gsa")
	logger.WithField("fleetName", c.fleetName).Info("fleet name for gsa")

	readyReplicas := c.checkReadyReplicas()
	logger.WithField("readyReplicas", readyReplicas).Info("number of ready replicas")

	// Log and return an error if there are no ready replicas
	if readyReplicas < 1 {
		logger.WithField("fleetName", c.fleetName).Info("insufficient ready replicas, cannot create fleet allocation")
		return allocationStatusUnAllocated, errors.New("insufficient ready replicas, cannot create fleet allocation")
	}

	// Get an AllocationInterface for this namespace
	allocationInterface := c.agonesClient.AllocationV1().GameServerAllocations(c.namespace)
	gsa := &allocationv1.GameServerAllocation{
		Spec: allocationv1.GameServerAllocationSpec{
			Required: metav1.LabelSelector{MatchLabels: map[string]string{agonesv1.FleetNameLabel: c.fleetName}},
			MetaPatch: allocationv1.MetaPatch{
				Annotations: map[string]string{GameTypeLabel: request.GetGameType().String()},
			},
		},
	}

	// Create a new allocation
	gsa, err := allocationInterface.Create(gsa)
	if err != nil {
		logger.WithError(err).Info("failed to create allocation")
		return allocationStatusUnAllocated, errors.New("failed to create allocation")
	}

	// Log the GameServer.Status
	logger.Info("New GameServer allocated: ", gsa.Status.State)
	return gsa.Status, nil
}

func (c *coordinatorAPIServer) checkReadyReplicas() int32 {
	fleetInterface := c.agonesClient.AgonesV1().Fleets(c.namespace)
	fleet, err := fleetInterface.Get(c.fleetName, metav1.GetOptions{})
	if err != nil {
		logger.WithError(err).Warn("get fleet failed")
	}

	return fleet.Status.ReadyReplicas
}
