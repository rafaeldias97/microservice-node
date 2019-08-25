# NODE + RabbitMQ + DOCKER + MongoDB

Basic example of micro service on nodejs

## Dependences and Execution
To start the project, you need to have [Node](https://nodejs.org/en/download/) and [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-windows) installed

```git
git clone https://github.com/rafaeldias97/microservice-node.git
```


##### Creating RabbitMQ Instance with Docker
```bash
docker network create custom
docker run -d --hostname rabbit --network custom --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
##### Running the project
```bash
cd microservice-node
docker-compose up --build
```
## RabbitMQ

Go to address http://localhost:15672 and authenticate with user guest and password guest

[![](https://raw.githubusercontent.com/rafaeldias97/microservice-node/master/docs/RabbitLogin.PNG)](https://raw.githubusercontent.com/rafaeldias97/microservice-node/master/docs/RabbitLogin.PNG)


Navigate to queue tab and check active queues. Note that you will have the **SavePerson** queue

[![](https://raw.githubusercontent.com/rafaeldias97/microservice-node/master/docs/RabbitQueues.PNG)](http://https://raw.githubusercontent.com/rafaeldias97/microservice-node/master/docs/RabbitQueues.PNG)
