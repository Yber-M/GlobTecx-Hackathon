const { connect } = require("mongoose");

class Connection {
  async start() {
    try {
      await connect("mongodb://127.0.0.1/globtecx");

      console.log("Conectado correctamente");
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}

module.exports = new Connection();
