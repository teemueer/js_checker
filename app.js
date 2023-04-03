const express = require("express");
const cors = require("cors");
require("express-async-errors");
const database = require("./database/db");
const testRouter = require("./controllers/test");
const checkRouter = require("./controllers/check");

database.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/assignment", testRouter);

module.exports = app;
