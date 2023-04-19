const express = require("express");
const Student = require("../database/models/student");

const router = express.Router();

router.get("/", async (req, res) => {
  const assignments = await Student.find().sort({ name: 1 });
  res.json(assignments);
});

/*
    TODO: Check for pre-existing user
    if found replace
    else create account + add assignment.

*/

router.post("/", async (req, res) => {
  const { user, assignment, result } = req.body;
  console.log(user + assignment + result);

  const student = await Student.find({
    name: user,
  });
  console.log(student);
  console.log(student[0].results);
  /*
  const student = new Student({
    name,
    results,
  });
  const newStudent = await student.save();
  console.log(newStudent.toJSON());
  res.json(newStudent.toJSON());
  */
  res.send("OK");
});

module.exports = router;
