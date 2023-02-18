<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://t3.ftcdn.net/jpg/02/05/78/12/360_F_205781253_acxA4jXNLyZN3XLFb7h3ySrXAlksPvXq.jpg" /></a>
</p>

## Rings Quest Backend

### Run all services with docker compose

#### Prerequisites

Before you run on docker, make sure that you have the following requirements installed on your system:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Pull and run from dockerhub
```shell
$ docker-compose pull
$ docker-compose up
````

On the first time running this, the app container should be failed:
1. Go to the DB section below and follow the orders there
2. 
   ```shell
   $ docker-compose down
   $ docker-compose up
   ````

Now all the containers should work!

The service is exposed on http://localhost:3555

OpenApi (Swagger) is exposed here http://localhost:3555/api


## Development

### Prerequisites

Before you begin, make sure that you have the following requirements installed on your system:
- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (version v18.12.1)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

```shell
$ nvm use
$ npm install
```

## Running locally

#### Build and run docker-compose
```shell
$ docker-compose build
$ docker-compose up
````

#### Run the app
```bash
# development
$ npm run start
````
```bash
# watch mode
$ npm run start:dev
````
```bash
# production mode
$ npm run start:prod
```

## DB creation locally
After your docker-compose is up, you'll nee to create a DB: 
1. Navigate to [pdAdmin](http://localhost:5050/browser/)
2. Press on the "Add New Server" Button, a popup window will appear.
3. On the general tab name your server "rings_quest"
4. On the connection tab:
   - **Host name/address**: db 
   - **Port**: 5432
   - **Username**: user
   - **Password**: admin

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Developer tips

- You should use this CLI commands to generate controllers/services/modules:
```shell
$ nest generate module users
$ nest g controller users/controllers/users
$ nest g service users/services/users
```
