const { Schema, model } = require("mongoose");

const file_schema = new Schema(
  {
    title: { type: String },
    file: { type: String, required: true },
    date_uploaded: { type: Date, default: Date.now() },
    path: { type: String },
  },
  { versionKey: false }
);

module.exports = model("File", file_schema);
