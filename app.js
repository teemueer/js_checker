const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const database = require("./database/db");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const coursesRouter = require("./controllers/courses");
const middleware = require("./utils/middleware");
const assignmentsRouter = require("./controllers/assignments");
const studentsRouter = require("./controllers/students");

database.connect();

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use(middleware.tokenExtractor);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/students", studentsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
