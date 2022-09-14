const createPostCategoriesModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  }, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }
  return PostCategory;
}
module.exports = createPostCategoriesModel;