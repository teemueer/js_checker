const express = require("express");
const User = require("../models/user");
const Course = require("../models/course");
const Assignment = require("../models/assignment");
const { userExtractor } = require("../utils/middleware");

const router = express.Router();

// Route for getting all courses
router.get("/", async (req, res) => {
  const courses = await Course.find({})
    .populate("user", { username: 0, courses: 0 })
    .populate("assignments", {
      items: 0,
      course: 0,
    });
  res.json(courses);
});

// Route for getting a course by ID
router.get("/:id", async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId)
    .populate("user", { username: 0, courses: 0 })
    .populate("assignments", {
      name: 1,
      items: 0,
      course: 0,
    });
  res.json(course);
});

// Route for posting a new course
router.post("/", userExtractor, async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      error: "invalid user",
    });
  }

  const body = req.body;
  const course = new Course({
    name: body.name,
    user: user._id,
  });

  const savedCourse = await course.save();

  // Add this new course to the user
  user.courses = user.courses.concat(savedCourse._id);
  await user.save();

  res.json(savedCourse);
});

// Route for posting a new assignment for a course by ID
router.post("/:id", userExtractor, async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(401).json({
      error: "invalid course",
    });
  }

  const user = req.user;
  if (!user._id.equals(course.user)) {
    return res.status(401).json({
      error: "invalid user",
    });
  }

  const body = req.body;
  const assignment = new Assignment({
    name: body.name,
    items: body.items,
    course: courseId,
  });

  const savedAssignment = await assignment.save();

  // Add this new assignment to the course
  course.assignments = course.assignments.concat(savedAssignment._id);
  await course.save();

  res.json(savedAssignment);
});

// Route for patching a course by ID
router.patch("/:id", userExtractor, async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(401).json({
      error: "invalid course",
    });
  }

  const user = req.user;
  if (!user._id.equals(course.user)) {
    return res.status(401).json({
      error: "invalid user",
    });
  }

  const body = req.body;
  const updatedCourse = await course.updateOne({
    name: body.name,
  });

  res.json(updatedCourse);
});

// Route for deleting a course by ID
router.delete("/:id", userExtractor, async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(401).json({
      error: "invalid course",
    });
  }

  const user = req.user;
  if (!user._id.equals(course.user)) {
    return res.status(401).json({
      error: "invalid user",
    });
  }

  // Delete all assignments for this course
  for (const assignment of course.assignments) {
    await Assignment.findByIdAndDelete(assignment._id);
  }

  await course.deleteOne();

  // Delete this course from the user
  user.courses = user.courses.filter((course) => course._id === courseId);
  await user.save();

  res.send(course);
});

module.exports = router;