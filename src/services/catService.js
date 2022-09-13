const { Category } = require('../database/models');

const getAll = async () => Category.findAll();

const createCategory = async ({ name }) => {
  const [cat, created] = await Category.findOrCreate({
    where: { name },
    defaults: { name },
  });
  if (!created) return null;
  return cat.dataValues;
};

module.exports = { getAll, createCategory };

// findOrCreate: https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findorcreate