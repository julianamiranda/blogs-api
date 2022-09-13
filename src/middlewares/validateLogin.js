const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const validateLogin = (req, res, next) => {
  const verify = loginSchema.validate(req.body);
  if (verify.error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = {
  validateLogin,
};
