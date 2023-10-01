const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(new HttpError(401, "Not authorized"));
  }
  let user;
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    user = await User.findById(decoded.id);
    if (!user || !user.refreshToken) {
      return next(new HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return new HttpError((401, "Not authorized"));
    }

    try {
    } catch (error) {}
  }
};

module.exports = auth;
