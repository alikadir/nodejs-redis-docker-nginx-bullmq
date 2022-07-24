# 🚂 BullMQ - Background Job and Queue Service on Docker compose and Docker hub

**Run Local**

Set environment variables
```shell
cp apps/server/.env.local apps/server/.env
cp apps/worker/.env.local apps/worker/.env
```
Docker Compose Up (w/ build)
```shell
docker compose -f configs/docker-compose.yml up --build
```
---
Server Build
```shell
docker build -t alikadir/bull-server ./apps/server -f configs/server.Dockerfile 
```
Server Run
```shell
docker run --name server -p 3000:3000 -e REDIS_HOST=redis alikadir/bull-server 
```
---
Worker Build
```shell
docker build -t alikadir/bull-worker ./apps/worker -f configs/worker.Dockerfile 
```
Worker Run (Repeatable)
```shell
docker run --name worker -e REDIS_HOST=redis -e QUEUE_NAME=repeatableQueue alikadir/bull-worker 
```
Worker Run (Simple)
```shell
docker run --name worker -e REDIS_HOST=redis -e QUEUE_NAME=simpleQueue alikadir/bull-worker 
```
---
Push to the Docker Hub
```shell
docker login
docker push alikadir/bull-server
docker push alikadir/bull-worker
```
