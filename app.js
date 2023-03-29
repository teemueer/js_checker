const express = require("express");
require("express-async-errors");
const database = require("./database/db");
const testRouter = require("./controllers/test");
const checkRouter = require("./controllers/check");

database.connect();

const app = express();
app.use(express.json());

app.use("/api/test", testRouter);
app.use("/api/check", checkRouter);

module.exports = app;
