const mongoose = require("mongoose");

//Name is required, but everything else can be left as blank! (for now)
const testSchema = new mongoose.Schema({
  name: String,
  prompts: Array,
  elements: Array,
});

module.exports = mongoose.model("Test", testSchema);
