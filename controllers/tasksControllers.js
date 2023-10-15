const controllerWrapper = require("../utils/controllerWrapper");

const {
  getAllTasksService,
  getTaskByIdService,
  addTaskService,
  updateTaskService,
  deletedTaskService,
} = require("../services/tasksService");

const getAllTasks = controllerWrapper(async (req, res) => {
  const tasks = await getAllTasksService(req.user._id);
  res.json(tasks);
});

// let getAllTasks = async (req, res, next) => {
//   const tasks = await getAllTasksService();
//   res.json(tasks);
// };
// getAllTasks = controllerWrapper(getAllTasks);

const getTaskById = controllerWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await getTaskByIdService(taskId, req.user._id);
  res.json(task);
});

const addTask = controllerWrapper(async (req, res) => {
  const newTask = await addTaskService(req.body, req.user._id);
  res.status(201).json(newTask);
});

const updateTask = controllerWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await updateTaskService(taskId, req.user._id, req.body);
  res.json(task);
});

const deleteTask = controllerWrapper(async (req, res) => {
  const { taskId } = req.params;
  const deletedTask = await deletedTaskService(taskId, req.user._id);
  res.json(deletedTask);
});

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
