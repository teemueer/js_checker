const express = require("express");
const Test = require("../database/models/test");
const puppeteer = require("puppeteer");
const Parser = require("../utils/parser");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({});
});

router.post("/", async (req, res) => {
  const { exercise, url } = req.body;

  const test = await Test.findOne({ name: exercise });

  if (!test) {
    res.status(404).json({ message: `Exercise '${exercise} was not found` });
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

module.exports = router;
