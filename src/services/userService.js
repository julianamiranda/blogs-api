const { User } = require('../database/models');

const getAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const createUser = async ({ displayName, email, password, image }) => {
  const [usr, created] = await User.findOrCreate({
    where: { email },
    defaults: { displayName, email, password, image },
  });
  if (!created) return null;
  return usr.dataValues;
};

module.exports = { getAll, createUser };

// findOrCreate: https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findorcreate