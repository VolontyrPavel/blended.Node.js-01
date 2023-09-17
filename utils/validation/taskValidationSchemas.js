const Joi = require('joi');
const FieldLength = require('../../constants/fieldLength');

const createValidationTaskSchema = Joi.object({
  title: Joi.string()
    .min(FieldLength.TITLE_MIN_LENGTH)
    .max(FieldLength.TITLE_MAX_LENGTH)
    .required(),
  completed: Joi.boolean(),
});

const updateTaskValidationSchema = Joi.object()
  .keys({
    title: createValidationTaskSchema.extract('title').optional(),
    completed: createValidationTaskSchema.extract('completed').optional(),
  })
  .or('title', 'completed');

module.exports = {
  createValidationTaskSchema,
  updateTaskValidationSchema,
};
