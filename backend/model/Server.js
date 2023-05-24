const express = require("express");
const file_upload = require("express-fileupload");

const user_route = require("../routes/UserRoute");
const file_route = require("../routes/FileRoute");

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(file_upload());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    // USERS
    this.app.use("/users", user_route);
    this.app.use("/files", file_route);
  }

  start() {
    this.app.listen(3000, () => {
      console.log("Server in port 3000");
    });
  }
}

module.exports = new Server();
