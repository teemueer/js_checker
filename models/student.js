const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    results: [],
  },
  { versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
