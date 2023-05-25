const { response } = require("express");

class Response {
  constructor(res = response) {
    this.res = res;
  }

  reply(msg, body) {
    this.res.json({ msg, body });
  }
}

module.exports = Response;
