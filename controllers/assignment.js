const express = require("express");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");
const Assignment = require("../database/models/assignment");

const router = express.Router();

router.get("/", async (req, res) => {
  const assignments = await Assignment.find().sort({ name: 1 });
  res.json(assignments);
});

//route for updating current test
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedAssignment = await Assignment.findByIdAndUpdate(id, req.body);
  res.json(updatedAssignment.toJSON());
});

// route for deleting tests
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Assignment.findByIdAndRemove(id);
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

  console.log(`Checking ${url} for assignment ${assignment.name}...`);

  const browser = await puppeteer.launch({
    //headless: false,
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
    //await page.waitForTimeout(5000);
    await browser.close();
  }
});

router.patch("/", async (req, res) => {});

module.exports = router;
