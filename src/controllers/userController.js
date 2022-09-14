const jwt = require('jsonwebtoken');
require('dotenv').config();
const userService = require('../services/userService');
const postService = require('../services/postService');
const jwtService = require('../services/jwtService');

const getAll = async (req, res) => {
  try {
    const result = await userService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getById(id);
    if (!result) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

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

const remove = async (req, res) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  const user = jwt.verify(token, secret);
  const userId = await postService.getUserId(user.data);
  await userService.exclui(userId);
  return res.status(204).send();
};
module.exports = {
  getAll,
  getById,
  create,
  remove,
};