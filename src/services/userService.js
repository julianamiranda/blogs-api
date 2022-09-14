const { User } = require('../database/models');

const getAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getById = async (id) => {
  const result = User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return result;
};

const createUser = async ({ displayName, email, password, image }) => {
  const [usr, created] = await User.findOrCreate({
    where: { email },
    defaults: { displayName, email, password, image },
  });
  if (!created) return null;
  return usr.dataValues;
};

const exclui = async (id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = { getAll, getById, createUser, exclui };

// findOrCreate: https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findorcreate