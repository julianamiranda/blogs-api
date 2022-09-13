const catService = require('../services/catService');

const getAll = async (req, res) => {
  try {
    const result = await catService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500);
  }
};

const create = async (req, res) => {
  try {
    const result = await catService.createCategory(req.body);
    if (!result) return res.status(409).json({ message: 'Category already registered' });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500);
  }
};
module.exports = {
  getAll,
  create,
};