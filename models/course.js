const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minglength: 3,
    },
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
  },
  { versionKey: false }
);

courseSchema.plugin(uniqueValidator);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
