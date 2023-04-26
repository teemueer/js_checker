const config = require("../utils/config");
const express = require("express");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");
const Assignment = require("../models/assignment");
const { userExtractor } = require("../utils/middleware");
const Course = require("../models/course");

const router = express.Router();

// Route for getting all assignments
router.get("/", userExtractor, async (req, res) => {
  const user = req.user;
  const assignments = await Assignment.find({ user });
  res.json(assignments);
});

// Route for getting assignment by ID
router.get("/:id", userExtractor, async (req, res) => {
  const assignmentId = req.params.id;
  const assignment = await Assignment.findById(assignmentId);
  res.json(assignment);
});

// Route for patching assignment by ID
router.patch("/:id", userExtractor, async (req, res) => {
  const assignmentId = req.params.id;
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    return res.status(401).json({
      error: "invalid assignment",
    });
  }

  const course = await Course.findById(assignment.course);
  const user = req.user;

  if (!user._id.equals(course.user)) {
    return res.status(401).json({
      error: "invalid user",
    });
  }

  const body = req.body;
  const updatedAssignment = await assignment.updateOne({
    name: body.name,
    description: body.description,
    points: body.points,
    items: body.items,
  });

  res.json(updatedAssignment);
});

// Route for deleting assignment by ID
router.delete("/:id", userExtractor, async (req, res) => {
  const assignmentId = req.params.id;
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    return res.status(401).json({
      error: "invalid assignment",
    });
  }

  const course = await Course.findById(assignment.course);
  const user = req.user;

  if (!user._id.equals(course.user)) {
    return res.status(401).json({
      error: "invalid user",
    });
  }

  await assignment.deleteOne();

  // Delete this assignment from the course
  course.assignments = course.assignments.filter(
    (assignment) => assignment._id === assignmentId
  );
  await course.save();

  res.send(assignment);
});

// Route for using assignment
router.post("/:id", async (req, res) => {
  const assignmentId = req.params.id;
  const { url } = req.body;

  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    res
      .status(404)
      .json({ message: `Assignment '${assignmentId} was not found` });
    return;
  }

  console.log(`Checking ${url} for assignment ${assignment.name}...`);

  const browser = await puppeteer.launch({
    headless: config.DEBUG_MODE ? false : true,
    args: ["--no-sandbox"],
  });

  const [page] = await browser.pages();
  page.setDefaultNavigationTimeout(5000);

  const parser = new Parser(page, assignment);

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
    const results = await parser.parse();
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.json([{ description: "Site did not work properly", result: "FAIL" }]);
  } finally {
    if (config.DEBUG) await page.waitForTimeout(5000);
    await browser.close();
  }
});

module.exports = router;
