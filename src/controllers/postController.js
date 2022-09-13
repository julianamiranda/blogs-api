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

module.exports = {
  getAll,
  getById,
};