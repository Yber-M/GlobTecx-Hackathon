const mongodb = require("./db/connection");
const server = require("./model/Server");

mongodb.start();

server.start();
