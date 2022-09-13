const { User } = require('../database/models');

const verifyUser = async (email, password) => {
  const result = await User.findOne({ where: { email, password } });
  if (!result) return null;
  return true;
};

module.exports = {
  verifyUser,
};