const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minglength: 3,
    },
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { versionKey: false }
);

courseSchema.plugin(uniqueValidator);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
