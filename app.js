const express = require("express");
const app = express();
const { tasksRouter } = require("./routes/tasks");

app.use(express.json());
app.use("/tasks", tasksRouter);

module.exports = { app };
