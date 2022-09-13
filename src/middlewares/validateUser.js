const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const validateUser = (req, res, next) => {
  const verify = userSchema.validate(req.body);
  if (verify.error) return res.status(400).json({ message: verify.error.message });
  return next();
};

module.exports = { validateUser };
