const HttpError = require('../HttpError');

const validateBody = (validateSchema) => {
  return (req, res, next) => {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      return next(new HttpError(422, error));
    }
    next();
  };
};

module.exports = validateBody;
