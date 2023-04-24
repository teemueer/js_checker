const config = require("../utils/config");
const express = require("express");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");
const Assignment = require("../models/assignment");
const Student = require("../models/student");
const { userExtractor } = require("../utils/middleware");
const Course = require("../models/course");

const router = express.Router();

// Route for getting all assignments
router.get("/", async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// Route for getting assignment by ID
router.get("/:id", async (req, res) => {
  const assignmentId = req.params.id;
  const assignments = await Assignment.findById(assignmentId);
  res.json(assignments);
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
router.post("/:name", async (req, res) => {
  const name = req.params.name;
  const { url } = req.body;

  const assignment = await Assignment.findOne({ name });
  if (!assignment) {
    res.status(404).json({ message: `Assignment '${name} was not found` });
    return;
  }

  //Parse assignment url for username
  const address = new URL(url);
  const username = address.pathname.split("/")[1].substring(1);
  console.log(`${username} assessing: ${name}`);
  const student = await Student.find({ name: username });

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
    //Just holds the text value that will be input to an assigment on submission.
    let isPass = results.length == 0 ? "PASS" : "FAIL";

    if (student.length != 0) {
      //Find if assignment has been inserted once to students data
      const updateStudent = await Student.findOne({
        _id: student[0]._id,
        results: {
          $elemMatch: { id: assignment.id },
        },
      });
      //If User has assignment done replace pass/fail value
      if (updateStudent != null) {
        await Student.updateOne(
          { _id: student[0]._id, "results.id": assignment.id },
          {
            $set: { "results.$.result": isPass },
            $inc: { "results.$.attempts": 1 },
          }
        );
      } else {
        //Create a new assignment.
        await Student.updateOne(
          { _id: student[0]._id },
          {
            $push: {
              results: {
                id: assignment.id,
                name: name,
                attempts: 1,
                result: isPass,
              },
            },
          }
        );
      }
    } else {
      const student = new Student({
        name: username,
        results: [
          {
            id: assignment.id,
            name: name,
            attempts: 1,
            result: isPass,
          },
        ],
      });
      await student.save();
    }
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
