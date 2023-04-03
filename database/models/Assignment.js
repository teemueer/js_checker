const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    items: [],
  },
  { versionKey: false }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
