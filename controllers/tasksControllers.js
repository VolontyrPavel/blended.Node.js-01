const {
  getAllTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deletedTaskService,
} = require("../services/tasksService");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasksService();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await getTaskByIdService(taskId);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const addTask = async (req, res, next) => {
  try {
    const newTask = await addTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await updateTaskService(taskId, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await deletedTaskService(taskId);
    res.json(deletedTask);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
