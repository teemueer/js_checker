const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);

studentSchema.plugin(uniqueValidator);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
