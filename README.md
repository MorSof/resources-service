<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://t3.ftcdn.net/jpg/02/05/78/12/360_F_205781253_acxA4jXNLyZN3XLFb7h3ySrXAlksPvXq.jpg" alt="NestJS" /></a>
</p>

# Resources Service

## Prerequisites

Before you begin, make sure that you have the following requirements installed on your system:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (version v18.12.1)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

```shell
$ nvm use
$ npm install
```

## Running locally

### Docker
Navigate to the `rings-quest-ops` repository and follow the instructions in the README.md file to set up your working environment.

### Run the app
Open the terminal and run ONE of the following commands, depending on your needs:

```bash
# development
$ npm run start
```

```bash
# watch mode
$ npm run start:dev
```

```bash
# production mode
$ npm run start:prod
```

Now everything is set! The service is exposed at: http://localhost:3002

The OpenAPI (Swagger) documentation is available at: http://localhost:3002/api

## Testing

```bash
# unit tests
$ npm run test
```

```bash
# e2e tests
$ npm run test:e2e
```

```bash
# test coverage
$ npm run test:cov
```

## Developer Tips

- You can use the following CLI commands to generate controllers, services, and modules:

```shell
$ nest generate module users
$ nest g controller users/controllers/users
$ nest g service users/services/users
```

These commands are useful for generating the necessary files for your NestJS application. Replace `users` with the desired name for your module, controller, or service.
