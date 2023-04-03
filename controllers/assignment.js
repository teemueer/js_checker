const express = require("express");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");
const Assignment = require("../database/models/assignment");

const router = express.Router();

router.get("/", async (req, res) => {
  const tests = await Assignment.find().sort({ name: 1 });
  res.json(tests);
});

//route for updating current test
router.patch("/:id", async (req, res) => {
  const { name, items } = req.body;
  const id = req.params.id;
  const fetchAssignment = await Assignment.findById(id);

  fetchAssignment.name == name;
  fetchAssignment.items = items.slice(0);

  await fetchAssignment.save();
  res.json(fetchAssignment.toJSON());
});

// route for deleting tests
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Assignment.findOneAndDelete({ _id: id });
  res.send(id);
});

// route for posting new tests
router.post("/", async (req, res) => {
  const { name, items } = req.body;
  const assignment = new Assignment({
    name,
    items,
  });
  const newAssignment = await assignment.save();
  res.json(newAssignment.toJSON());
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

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

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
