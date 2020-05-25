package coordinator

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net"

	coordinatorv1 "github.com/nhan-ng/openpuz/gen/go/coordinator/v1"

	"go.uber.org/zap"
	"google.golang.org/grpc"
)

// Serve creates a new gRPC server the coordinator.
func Serve(port int) error {
	logger, _ := zap.NewDevelopment()

	grpcServer := grpc.NewServer()
	coordinatorv1.RegisterCoordinatorAPIServer(grpcServer, &coordinatorAPIServer{})
	logger.Info("Created gRPC server")

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		return fmt.Errorf("unable to create a tcp listener %d: %w", port, err)
	}
	logger.Info("Listening on port", zap.Int("port", port))

	return grpcServer.Serve(lis)
}

type coordinatorAPIServer struct {
}

func (c *coordinatorAPIServer) CreateLobby(ctx context.Context, request *coordinatorv1.CreateLobbyRequest) (*coordinatorv1.CreateLobbyResponse, error) {
	log.Printf("Received: %v\n", request)
	return nil, errors.New("not implemented")
}
