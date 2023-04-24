const express = require("express");
const Student = require("../models/student");
const router = express.Router();

router.get("/", async (req, res) => {
  const assignments = await Student.find().sort({ name: 1 });
  res.json(assignments);
});

module.exports = router;
