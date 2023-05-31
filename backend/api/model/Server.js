const express = require("express");
const compression = require("compression");
const cors = require("cors");
const path = require("path");

const user_route = require("../routes/UserRoute");
const file_route = require("../routes/FileRoute");
const bot_route = require("../routes/BotRoute");

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
  }

  routes() {
    // USERS
    this.app.use("/users", user_route);
    this.app.use("/files", file_route);
    this.app.use("/bot", bot_route);
    this.app.use(
      "/public",
      express.static(path.join(__dirname, "../../../frontend"))
    );
  }

  start() {
    this.app.listen(3000, () => {
      console.log("Server in port 3000");
    });
  }
}
module.exports = new Server();
