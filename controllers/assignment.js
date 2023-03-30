const express = require("express");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");
const Assignment = require("../database/models/assignment");

const router = express.Router();

router.get("/", async (req, res) => {
  const exercises = await Assignment.find({});
  res.json(exercises);
});

// route for posting new exercises
router.post("/", async (req, res) => {
  const { name, json } = req.body;

  console.log(json);

  const assignment = new Assignment({
    name,
    elements: json.elements,
  });

  const savedAssignment = await assignment.save();
  res.json(savedAssignment.toJSON());
});

// route for posting url and getting results
router.post("/:name", async (req, res) => {
  const name = req.params.name;
  const { url } = req.body;

  const assignment = await Assignment.findOne({ name });
  if (!assignment) {
    res.status(404).json({ message: `Assignment '${name} was not found` });
    return;
  }

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const [page] = await browser.pages();

  const parser = new Parser(page, assignment);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const results = await parser.parse();

  await browser.close();

  res.json(results || []);
});

router.patch("/", async (req, res) => {});

module.exports = router;
