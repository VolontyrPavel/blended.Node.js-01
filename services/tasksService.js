const Task = require('../models/Task');

const HttpError = require('../utils/HttpError');

const getAllTasksService = async () => {
  return await Task.find();
};

const getTaskByIdService = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return task;
};

const addTaskService = async (body) => {
  return await Task.create(body);
};

const updateTaskService = async (taskId, body) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });
  if (!updatedTask) {
    throw new HttpError(404, 'Task not found');
  }
  return updatedTask;
};

const deletedTaskService = async (taskId) => {
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (!deletedTask) {
    throw new HttpError(404, 'Task not found');
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
