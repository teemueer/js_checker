const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    //prompts: [String],
    items: [],
  },
  { versionKey: false }
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
