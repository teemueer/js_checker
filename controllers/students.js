const express = require("express");
const Student = require("../models/student");
const Assignment = require("../models/assignment");
const Course = require("../models/course");
const router = express.Router();

//Get all students
router.get("/", async (req, res) => {
  const assignments = await Student.find().sort({ username: 1 });
  res.json(assignments);
});

//Get students that are enrolled in a certain course.
router.post("/test", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const response = await Student.find({ courses: { _id: id } });
  console.log("enrolled pupils: " + response);
  return res.json(response);
});

router.get("/assignment/:id", async (req, res) => {
  const assignmentId = req.params.id;
  console.log(assignmentId);
  const assignment = await Assignment.findById(assignmentId, {
    user: 0,
    items: 0,
  }).populate("course", { name: 1 });
  console.log(assignment);
  res.json(assignment);
});
module.exports = router;
