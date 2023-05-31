const bot_service = require("../service/BotService");

class BotController {
  send_question(req, res) {
    return bot_service.send_question(req, res);
  }
}

module.exports = BotController;
