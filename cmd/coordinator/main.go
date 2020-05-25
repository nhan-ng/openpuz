package main

import (
	"log"

	"github.com/nhan-ng/openpuz/pkg/cmd/coordinator"
)

func main() {
	if err := coordinator.Serve(9090); err != nil {
		log.Fatalf("failed to serve %v", err)
	}
}
