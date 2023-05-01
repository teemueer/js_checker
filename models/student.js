const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    results: [
      {
        assignment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Assignment",
        },
        attempts: Number,
        passed: Boolean,
      },
    ],
  },
  { versionKey: false }
);

studentSchema.plugin(uniqueValidator);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
