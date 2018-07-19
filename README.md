# Node backend API using JWT, MongoDB and Express

This sample API is created with Node.js (v8), Express and MongoDB. The authentication uses JWT.

## Docker

Docker container is used to setup NodeJS and MongoDB. Dockerfile is in docker folder. The data is persisted in the folder mongodb. 


## NPM dependecies 

After closing project run npm install to install all dependencies. If you need to install it manually below is the list.

```bash
  # nodemon & express
  npm i -S express body-parser  

  # mongoDB 
  npm i -S mongoose

  # password encryption with bcrypt
  npm i -S bcrypt-nodejs

  # development
  npm i -D nodemon 

```

## NPM scripts

To start development type npm run dev.


## 