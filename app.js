const express = require("express");

const { globalErrorHandle } = require("./middlewares/globalErrorHandle");
const router = require("./routes/rootRouter");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();

app.use(express.json());
app.use(router);
app.use(notFoundHandler);

app.use(globalErrorHandle);

module.exports = { app };
