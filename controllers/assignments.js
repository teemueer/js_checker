const config = require("../utils/config");
const express = require("express");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");
const Assignment = require("../models/assignment");
const Student = require("../models/student");
const { userExtractor } = require("../utils/middleware");
const Course = require("../models/course");

const router = express.Router();

router.get("/test", async (req, res) => {
  const assignments = await Assignment.find({}, { _id: 1, name: 1 });
  res.json(assignments);
});

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
    (assignment) => !assignment._id.equals(assignmentId)
  );

  await course.save();

  res.send(assignment);
});

// Route for using assignment
router.post("/:id", async (req, res) => {
  const assignmentId = req.params.id;
  const { url } = req.body;

  // Parse assignment url for username
  const regex = /https:\/\/users\.metropolia\.fi\/~(\w+)?/;
  const m = url.match(regex);
  const username = m ? m[1] : null;

  if (!username) {
    return res
      .status(403)
      .json({ message: "Testing allowed from users.metropolia only" });
  }

  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    return res
      .status(404)
      .json({ message: `Assignment '${assignmentId} was not found` });
  }

  console.log(`Checking ${url} for assignment ${assignment.name}...`);

  const browser = await puppeteer.launch({
    headless: config.DEBUG_MODE ? false : true,
    args: ["--no-sandbox"],
  });

  const [page] = await browser.pages();
  page.setDefaultNavigationTimeout(5000);

  const parser = new Parser(page, assignment);

  let results;
  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
    results = await parser.parse();
  } catch (error) {
    console.error(error.message);
    results = [{ description: "Site did not work properly", result: "FAIL" }];
  } finally {
    if (config.DEBUG) await page.waitForTimeout(5000);
    await browser.close();
  }

  console.log("results", results);

  const student = await Student.findOne({ username });
  const passed = results.length === 0;
  if (student) {
    if (!student.courses.includes(assignment.course)) {
      console.log("Adding to course.");
      student.courses.push(assignment.course);
    }
    {
      console.log("Has enrolled to this course");
    }
    const resultToUpdate = student.results.find((result) =>
      result.assignment.equals(assignment._id)
    );

    if (!resultToUpdate) {
      console.log("New assignment");
      student.results.push({
        assignment: assignment._id,
        name: assignment.name,
        attempts: 1,
        passed,
      });
    } else if (resultToUpdate) {
      console.log("upating attempts");
      resultToUpdate.attempts += 1;
      resultToUpdate.passed = passed;
    }

    await student.save();
  } else {
    const student = new Student({
      username,
      courses: [assignment.course],
      results: [
        {
          assignment: assignment._id,
          name: assignment.name,
          attempts: 1,
          passed,
        },
      ],
    });

    await student.save();
  }

  return res.json(results);
});

module.exports = router;
