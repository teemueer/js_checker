const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    points: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    results: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        attempts: { type: Number, default: 0 },
        passed: { type: Boolean, default: false },
      },
    ],
    items: [],
  },
  { versionKey: false }
);

assignmentSchema.plugin(uniqueValidator);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
