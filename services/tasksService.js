const fs = require('fs').promises;
// const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const HttpError = require('../utils/HttpError');

const tasksPath = path.join(__dirname, '..', 'db', 'tasks.json');
// const tasksPath = path.join(process.cwd(), "db", "tasks.json");

const getAllTasksService = async () => {
  return await readDatabase();
};

const getTaskByIdService = async (taskId) => {
  const tasks = await readDatabase();
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    throw new HttpError(404, 'Task not found');
  }
  return task;
};

const addTaskService = async (body) => {
  const tasks = await readDatabase();
  const newTask = { id: crypto.randomUUID(), ...body };
  tasks.push(newTask);
  await writeDatabase(tasks);
  return newTask;
};

const updateTaskService = async (taskId, body) => {
  const tasks = await readDatabase();
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new HttpError(404, 'Task not found');
  }
  tasks[index] = { ...tasks[index], ...body };
  await writeDatabase(tasks);
  return tasks[index];
};

const deletedTaskService = async (taskId) => {
  const tasks = await readDatabase();
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new HttpError(404, 'Task not found');
  }
  const [deletedTask] = tasks.splice(index, 1);
  await writeDatabase(tasks);
  return deletedTask;
};

async function readDatabase() {
  const data = await fs.readFile(tasksPath);
  return JSON.parse(data);
}

async function writeDatabase(data) {
  await fs.writeFile(tasksPath, JSON.stringify(data, null, 2));
}

module.exports = {
  getAllTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deletedTaskService,
};
