const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    items: [],
  },
  { versionKey: false }
);

assignmentSchema.plugin(uniqueValidator);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;