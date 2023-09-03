const express = require("express");
const {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControllers");

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:taskId", getTaskById);
router.post("/", addTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = { tasksRouter: router };
