const mongoose = require("mongoose");

//Name is required, but everything else can be left as blank! (for now)
/*
 If schema becomes too complex. Create extra schemas for arrays.
*/
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  prompts: Array,
  elements: Array,
  answers: Array,
});

module.exports = mongoose.model("Test", testSchema);
