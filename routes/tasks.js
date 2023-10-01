const express = require('express');
const {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksControllers');
const validateBody = require('../utils/validation/validateBody');
const {
  createValidationTaskSchema,
  updateTaskValidationSchema,
} = require('../utils/validation/taskValidationSchemas');

const router = express.Router();

router
  .route('/')
  .get(getAllTasks)
  .post(validateBody(createValidationTaskSchema), addTask);

router
  .route('/:taskId')
  .get(getTaskById)
  .patch(validateBody(updateTaskValidationSchema), updateTask)
  .delete(deleteTask);

module.exports = { tasksRouter: router };
