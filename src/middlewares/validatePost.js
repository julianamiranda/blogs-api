const Joi = require('joi');

const updateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validateUpdate = (req, res, next) => {
  const verify = updateSchema.validate(req.body);
  if (verify.error) return res.status(400).json({ message: 'Some required fields are missing' });
  return next();
};

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const validatePost = (req, res, next) => {
  const verify = postSchema.validate(req.body);
  if (verify.error) return res.status(400).json({ message: 'Some required fields are missing' });
  return next();
};
module.exports = { validateUpdate, validatePost };
