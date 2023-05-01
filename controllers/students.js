const express = require("express");
const Student = require("../models/student");
const Assignment = require("../models/assignment");
const Course = require("../models/course");
const router = express.Router();

router.get("/", async (req, res) => {
  const assignments = await Student.find().sort({ username: 1 });
  res.json(assignments);
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
