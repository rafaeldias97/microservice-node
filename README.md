# NODE + RabbitMQ + DOCKER + MongoDB

Basic example of micro service on nodejs

## Dependences and Execution
To start the project, you need to have [Node](https://nodejs.org/en/download/) and [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-windows) installed

```git
git clone https://github.com/rafaeldias97/microservice-node.git
```

```bash
docker network create custom
docker run -d --hostname rabbit --network custom --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
```bash
cd microservice-node
docker-compose up --build
```