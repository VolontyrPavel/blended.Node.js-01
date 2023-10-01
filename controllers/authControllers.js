const controllerWrapper = require("../utils/controllerWrapper");
const {
  registrationService,
  loginService,
} = require("../services/authService");

const authRegistrate = controllerWrapper(async (req, res) => {
  const newUser = await registrationService(req.body);
  res.json(newUser);
});

const authLogin = controllerWrapper(async (req, res) => {
  const accessToken = await loginService(req.body);
  res.json({ accessToken });
});

module.exports = {
  authRegistrate,
  authLogin,
};
