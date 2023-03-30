const express = require("express");
const cors = require("cors");
require("express-async-errors");
const database = require("./database/db");
const assignmentRouter = require("./controllers/assignment");

database.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/assignment", assignmentRouter);

module.exports = app;
