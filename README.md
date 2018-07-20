# Node backend API using JWT, Passport, MongoDB and Express

This sample API is created with Node.js (v8), Express and MongoDB. The authentication uses JWT & passport.js with local and jwt strategy.

## Requirements 

- Docker to run mongodb container, othwerwise istalled mongodb running on the default port
- Node.js v8. During development v8 LTE version of NodeJS is used. In some scripts ES6 syntax is used like arrow functions and promisses. Babel is not used.

## Docker

Docker container is used to setup NodeJS and MongoDB. The data is persisted in the folder mongo/data. The mongodb models are in model folder. 

```bash

  # start docker-compose up for mongodb & mongo-express (web based admin app in node)
  npm run docker:up
  # OR simply run docker command and add -d for detached mode
  docker-compose up -d

  # STOP and remove close and remove containers and network
  npm run docker:down
  # OR run docker-compose command 
  docker-compose down
  #start mongodb docker instance in deamon mode  
  npm run mongo:start

  #stop mongodb docker container will be automatically removed
  npm run mongo:stop

```


## NPM dependecies 

After closing project run npm install to install all dependencies. If you need to install it manually below is the list.

```bash
  # nodemon & express
  npm i -S express body-parser  

  # mongoDB 
  npm i -S mongoose

  # password encryption with bcrypt
  npm i -S bcrypt-nodejs

  # JWT & authentication
  npm i -S jwt-simple passport passport-jwt passport-local

  # nodemon for development
  npm i -D nodemon 

```

## NPM scripts

To start development you need to run at least 2 npm commands, 1 for mongodb docker start and 2 for nodemon app start.

```bash

  # 1. start mongodb & admin interface docker containers
  # bash window will be in interactive mode
  npm run docker

  # 2. start nodemon on nodejs app using index.js
  npm run dev

  # 3 when done close containers 
  npm run stop

```
