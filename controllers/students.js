const express = require("express");
const Student = require("../models/student");
const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find().sort({ name: 1 });
  res.json(students);
});

module.exports = router;
