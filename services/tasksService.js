const Task = require("../models/Task");
const User = require("../models/User");

const HttpError = require("../utils/HttpError");

const getAllTasksService = async userId => {
  return await Task.find({ owner: userId });
};

const getTaskByIdService = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, owner: userId });

  if (!task) {
    throw new HttpError(404, "Task not found");
  }

  return task;
};

const addTaskService = async (body, userId) => {
  return await Task.create({ ...body, owner: userId });
};

const updateTaskService = async (taskId, userId, body) => {
  const updatedTask = await Task.findOneAndUpdate({ _id: taskId, owner: userId }, body, {
    new: true,
  });
  if (!updatedTask) {
    throw new HttpError(404, "Task not found");
  }
  return updatedTask;
};

const deletedTaskService = async (taskId, userId) => {
  const deletedTask = await Task.findOneAndDelete({ _id: taskId, owner: userId });
  if (!deletedTask) {
    throw new HttpError(404, "Task not found");
  }
  return deletedTask;
};

module.exports = {
  getAllTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deletedTaskService,
};
