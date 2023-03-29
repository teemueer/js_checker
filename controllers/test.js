const express = require("express");
const Test = require("../database/models/test");

const router = express.Router();

router.get("/", async (req, res) => {
  const tests = await Test.find({});
  res.json(tests);
});

router.post("/", async (req, res) => {
  const { name, json } = req.body;

  const test = new Test({
    name,
    elements: json.elements,
  });

  const savedTest = await test.save();
  res.json(savedTest.toJSON());
});

router.patch("/", async (req, res) => {});

module.exports = router;
