const { BlogPost, Category, User, PostCategory, sequelize } = require('../database/models');

const getAll = async () => {
  const result = BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return result;
};

const getById = async (id) => {
  const result = BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const verifyUser = async (postId, email) => {
  const { user } = await getById(postId);
  console.log(user.email);
  if (email !== user.email) return null;
  return true;
};

const update = async ({ id, title, content }) => {
  const post = await getById(id);
  const result = await post.update({ title, content });
  return result;
};

const verifyCategory = async (categoryIds) => {
  const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
  if (!rows.length) return null;
  return true;
};

const getUserId = async (email) => {
  const { dataValues } = await User.findOne({ where: { email } });
  return dataValues.id;
};

const create = async ({ title, content, categoryIds, email }) => {
  const userId = await getUserId(email);
  const transactionResult = await sequelize.transaction(async (transaction) => {
    const post = await BlogPost.create({ title, content, userId }, { transaction });
    const data = categoryIds.map((categoryId) => ({ postId: post.dataValues.id, categoryId }));
    await PostCategory.bulkCreate(data, { transaction });
    return post;
  });

  return transactionResult;
};

const remove = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = { getAll, getById, verifyUser, update, verifyCategory, create, getUserId, remove };