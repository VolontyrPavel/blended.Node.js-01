const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

const User = model("user", userSchema);

module.exports = User;
