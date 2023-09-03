const fs = require("fs").promises;
// const fs = require('fs/promises');
const path = require("path");
const crypto = require("crypto");

const tasksPath = path.join(__dirname, "..", "db", "tasks.json");
// const tasksPath = path.join(process.cwd(), "db", "tasks.json");

const getAllTasks = async (req, res, next) => {
  const tasks = await readDatabase();
  res.json(tasks);
};

const getTaskById = async (req, res, next) => {
  const tasks = await readDatabase();
  const task = tasks.find(task => task.id === req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

const addTask = async (req, res, next) => {
  const tasks = await readDatabase();
  const newTask = { id: crypto.randomUUID(), ...req.body };
  tasks.push(newTask);
  await writeDatabase(tasks);
  res.status(201).json(newTask);
};

const updateTask = async (req, res, next) => {
  const tasks = await readDatabase();
  const index = tasks.findIndex(task => task.id === req.params.taskId);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks[index] = { ...tasks[index], ...req.body };
  await writeDatabase(tasks);
  res.json(tasks[index]);
};

const deleteTask = async (req, res, next) => {
  const tasks = await readDatabase();
  const index = tasks.findIndex(task => task.id === req.params.taskId);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  const [deletedTask] = tasks.splice(index, 1);
  await writeDatabase(tasks);
  res.json(deletedTask);
};

async function readDatabase() {
  const data = await fs.readFile(tasksPath);
  return JSON.parse(data);
}

async function writeDatabase(data) {
  await fs.writeFile(tasksPath, JSON.stringify(data, null, 2));
}

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
