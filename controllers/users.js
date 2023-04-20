const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("courses", {
    assignments: 0,
    user: 0,
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const body = req.body;

  if (body.password.length < 3) {
    return res.status(400).json({ error: "password too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

module.exports = router;
