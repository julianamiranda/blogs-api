const jwt = require('jsonwebtoken');
require('dotenv').config();
const postService = require('../services/postService');

const getAll = async (req, res) => {
  try {
    const result = await postService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postService.getById(id);
    if (!result) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const token = req.headers.authorization;

    const secret = process.env.JWT_SECRET;
    const user = jwt.verify(token, secret);

    const verify = await postService.verifyUser(id, user.data);
    if (!verify) return res.status(401).json({ message: 'Unauthorized user' });

    const result = await postService.update({ id, title, content });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const create = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { title, content, categoryIds } = req.body;

    const secret = process.env.JWT_SECRET;
    const user = jwt.verify(token, secret);

    const verify = await postService.verifyCategory(categoryIds);
    if (!verify) return res.status(400).json({ message: '"categoryIds" not found' });

    const result = await postService.create({ title, content, categoryIds, email: user.data });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    const secret = process.env.JWT_SECRET;
    const user = jwt.verify(token, secret);
    const userId = await postService.getUserId(user.data);

    const check = await postService.getById(id);
    if (!check) return res.status(404).json({ message: 'Post does not exist' });

    const test = await postService.verifyUser(userId, user.data);
    if (!test) return res.status(401).json({ message: 'Unauthorized user' });
    console.log('caiu aq');

    await postService.remove(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  update,
  create,
  remove,
};