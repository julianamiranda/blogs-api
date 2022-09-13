const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

const create = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    if (!result) return res.status(409).json({ message: 'User already registered' });

    const token = jwtService.createToken(result);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500);
  }
};
module.exports = {
  create,
};