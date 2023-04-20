const config = require("../utils/config");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: "1d",
  });

  res.status(200).send({
    token,
    username: user.username,
  });
});

module.exports = router;
