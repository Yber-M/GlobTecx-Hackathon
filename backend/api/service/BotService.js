const { request, response } = require("express");
const Response = require("../model/Response");
const axios = require("axios").default;

class BotService {
  async send_question(req = request, res = response) {
    try {
      let { question } = req.body;
      let data = { question };

      let bot_response = await axios.post("http://127.0.0.1:5001/", data);
      let response_bot = bot_response.data;
      return new Response(res).reply(
        response_bot["user"],
        response_bot["response"]
      );
    } catch (err) {
      new Response(res).reply(
        "Error",
        "Ocurrio un error al intentar obtener la respuestas del bot"
      );
    }
  }
}

module.exports = new BotService();
