const bcrypt = require("bcryptjs");

const User = require("../models/User");
const HttpError = require("../utils/HttpError");
const { assignTokens } = require("../utils/assignTokens");

const registrationService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new HttpError(409, "User already exist ");
  }

  return await User.create(body);
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "email or password is wrong ");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new HttpError(401, "email or password is wrong ");
  }

  const { accessToken, refreshToken } = assignTokens(user);

  await User.findByIdAndUpdate(user._id, { refreshToken });

  return accessToken;
};

module.exports = {
  registrationService,
  loginService,
};
