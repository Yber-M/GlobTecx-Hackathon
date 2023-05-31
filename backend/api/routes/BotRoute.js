const { Router } = require("express");
const BotController = require("../controller/BotController");

class BotRoute {
  constructor() {
    this.router = Router();
    this.bot_ctrl = new BotController();
    this.routes();
  }

  routes() {
    this.router.post("/", this.bot_ctrl.send_question);
  }
}

module.exports = new BotRoute().router;
