const express = require('express');

const { globalErrorHandle } = require('./middlewares/globalErrorHandle');
const { tasksRouter } = require('./routes/tasks');
const { authRouter } = require('./routes/auth');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();

app.use(express.json());
app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);
app.use(notFoundHandler);

app.use(globalErrorHandle);

module.exports = { app };
