const express = require("express");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");
const Test = require("../database/models/test");

const router = express.Router();

router.get("/", async (req, res) => {
  const tests = await Test.find({});
  res.json(tests);
});

//route for updating current test
router.patch("/:id", async (req, res) => {
  const { name, items } = req.body;
  const id = req.params.id;
  const fetchAssignment = await Test.findById(id);

  fetchAssignment.name == name;
  fetchAssignment.items = items.slice(0);

  await fetchAssignment.save();
  res.json(fetchAssignment.toJSON());
});

// route for deleting tests
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Test.findOneAndDelete({ _id: id });
  res.send(id);
});

// route for posting new tests
router.post("/", async (req, res) => {
  const { name, items } = req.body;
  const assignment = new Test({
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

  const test = await Test.findOne({ name });
  console.log(test);
  if (!test) {
    res.status(404).json({ message: `Exercise '${name} was not found` });
    return;
  }

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const [page] = await browser.pages();

  const parser = new Parser(page, test);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const results = await parser.parse();

  await browser.close();

  res.json(results || []);
});

router.patch("/", async (req, res) => {});

module.exports = router;
