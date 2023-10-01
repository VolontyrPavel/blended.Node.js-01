require('dotenv').config();
const mongoose = require('mongoose');

const { app } = require('./app');

const { DB_URI, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_URI).then(() => {
  console.log('Database connected successfully');
  app.listen(PORT, () => {
    console.log(`server is up running on port ${PORT}`);
  });
});
