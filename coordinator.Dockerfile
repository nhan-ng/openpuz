# ./
FROM golang:1.14.3-buster AS builder
WORKDIR /src

# COPY go.* and download modules
COPY go.* .
RUN go mod download

COPY . .
RUN GOOS=linux go build -o coordinator cmd/coordinator/main.go


FROM debian:buster-20200514-slim AS final
RUN apt update && apt install --no-install-recommends -y ca-certificates
RUN groupadd --gid 1000 coordinator \
  && useradd --uid 1000 --gid coordinator --shell /bin/bash --create-home coordinator

WORKDIR /app
COPY --from=builder /src/coordinator /app/coordinator
RUN chown -R coordinator /app \
  && chmod o+x /app/coordinator

USER coordinator
ENTRYPOINT [ "/app/coordinator" ]