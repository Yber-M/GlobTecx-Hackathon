const { Schema, model } = require("mongoose");

const user_schema = new Schema(
  {
    name: { type: String },
    lastname: { type: String },
    age: { type: Number },
    role: { type: String },
    career: { type: String },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    list_files: { type: [Schema.Types.ObjectId], ref: "File", default: [] },
  },
  { versionKey: false }
);

module.exports = model("User", user_schema);
