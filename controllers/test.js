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

router.post("/update", async (req, res) => {
  const { test } = req.body;
  //Get test with ID
  const fetchTest = await Test.findById(test._id);
  //Replace elements of test. database <- front-end
  fetchTest.elements = test.elements;
  //Save changes
  await fetchTest.save();
  res.json(fetchTest.toJSON());
});

// route for posting new tests
router.post("/", async (req, res) => {
  const { name, json } = req.body;

  console.log(json);

  const test = new Test({
    name,
    elements: json.elements,
  });

  const savedTest = await test.save();
  res.json(savedTest.toJSON());
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
