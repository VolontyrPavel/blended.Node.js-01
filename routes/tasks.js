const express = require("express");

const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    console.log("Hello from middleware");
    next();
  },
  (req, res, next) => {
    res.json({ message: "Hello people" });
  }
);

module.exports = { tasksRouter: router };
