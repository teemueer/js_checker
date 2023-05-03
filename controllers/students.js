const express = require("express");
const Student = require("../models/student");
const Assignment = require("../models/assignment");
const Course = require("../models/course");
const { userExtractor } = require("../utils/middleware");
const router = express.Router();

//Get all students
/*
router.get("/", async (req, res) => {
  const assignments = await Student.find().sort({ username: 1 });
  res.json(assignments);
});
*/

//Get students that are enrolled to a certain course.
/*
router.get("/course/:id", userExtractor, async (req, res) => {
  const courseId = req.params.id;

  if (!req.user.courses.includes(courseId)) {
    return res
      .status(403)
      .json({ error: "You can only get students from your own courses" });
  }

  const students = await Student.find({ courses: { _id: courseId } });
  return res.json(students);
});
*/

router.get("/assignment/:id", async (req, res) => {
  const assignmentId = req.params.id;

  const assignment = await Assignment.findById(assignmentId, {
    user: 0,
    items: 0,
  }).populate("course", { name: 1 });

  res.json(assignment);
});
module.exports = router;
