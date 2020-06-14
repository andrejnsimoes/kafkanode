## Micro services communicating with kafka

- main app (api)
- certificate generation service

## Communication

- the main app send a message to the certification service to generate the certificate [topic: issue-certificate]
- the micro service (certification) returns a message [topic: certificate-response]

## Dependencies

- [Node.js](https://nodejs.org/en/) >= 8.0.0
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Docker](https://docs.docker.com/install/)

## Getting started

1. Clone this repository && run ```docker-compose up```
2. Move to the directories (api && certification)<br />
3. Run `yarn` to install dependencies.<br />
4. Run `yarn dev`.

