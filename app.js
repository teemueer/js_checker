const express = require("express");
const cors = require("cors");
//require("express-async-errors");
const database = require("./database/db");
const assignmentRouter = require("./controllers/assignment");
const studentRouter = require("./controllers/student");

database.connect();

const app = express();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use("/api/assignment", assignmentRouter);
app.use("/api/student", studentRouter);

module.exports = app;
