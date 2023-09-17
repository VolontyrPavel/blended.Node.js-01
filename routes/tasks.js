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

router.get('/', getAllTasks);
router.get('/:taskId', getTaskById);
router.post('/', validateBody(createValidationTaskSchema), addTask);
router.patch('/:taskId', validateBody(updateTaskValidationSchema), updateTask);
router.delete('/:taskId', deleteTask);

module.exports = { tasksRouter: router };
