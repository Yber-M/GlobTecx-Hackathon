const { Schema, model } = require("mongoose");

const account_schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String },
  },
  { versionKey: false }
);

module.exports = model("Account", account_schema);
