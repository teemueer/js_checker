const puppeteer = require("puppeteer");
const fs = require("fs");
const Parser = require("./parser");
const keypress = require("./utils/keypress");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
app.use(express.json());

app.post("/test", async (req, res) => {
  const { url, exercise, test } = req.body;

  /*
  const [module, task] = exercise.split("-");
  const jsonFilepath = `./json/${module}/${task}.json`;
  if (!fs.existsSync(jsonFilepath)) {
    res.status(404).json({ message: "Exercise not found" });
    return;
  }
  const data = fs.readFileSync(jsonFilepath, "utf-8");
  const json = await JSON.parse(data);
  */

  const json = test;

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const [page] = await browser.pages();

  const parser = new Parser(page, json);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const results = await parser.parse();

  await browser.close();

  res.json(results || []);
});

module.exports = app;
