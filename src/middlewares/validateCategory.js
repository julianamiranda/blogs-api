const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategory = (req, res, next) => {
  const verify = categorySchema.validate(req.body);
  if (verify.error) return res.status(400).json({ message: verify.error.message });
  return next();
};

module.exports = {
  validateCategory,
};
