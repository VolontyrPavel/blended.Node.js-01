const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Task = model('task', taskSchema);

module.exports = Task;
