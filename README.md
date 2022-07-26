# 🚂 BullMQ - Background Job and Queue Service on Docker compose and Docker hub

## Run Local

### Set environment variables
```shell
cp apps/server/.env.local apps/server/.env
cp apps/worker/.env.local apps/worker/.env
```
### Docker Compose Up (w/ build)
```shell
docker compose -p my-mq-stack -f configs/docker-compose.yml up --build -p
```
---
### Server Build
```shell
docker build -t alikadir/bull-server ./apps/server -f configs/server.Dockerfile 
```
### Server Run
```shell
docker run --name server --network my-mq-stack_default -p 3000:3000 -e REDIS_HOST=redis alikadir/bull-server 
```
---
### Worker Build
```shell
docker build -t alikadir/bull-worker ./apps/worker -f configs/worker.Dockerfile 
```
### Worker Run (Repeatable)
```shell
docker run --name worker --network my-mq-stack_default -e REDIS_HOST=redis -e QUEUE_NAME=repeatableQueue alikadir/bull-worker 
```
### Worker Run (Simple)
```shell
docker run --name worker --network my-mq-stack_default -e REDIS_HOST=redis -e QUEUE_NAME=simpleQueue alikadir/bull-worker 
```
---
### Push to the Docker Hub
```shell
docker login
docker push alikadir/bull-server
docker push alikadir/bull-worker
```

### Note
Worker or server container must have the same network with redis to connect to redis container

To check all networks in docker,
```shell
docker network ls
```
To connect to Redis over **host** network
```shell
docker run --name en-yeni-worker --network host -e REDIS_HOST=localhost -e QUEUE_NAME=acmeQueue alikadir/bull-worker
```

