const createCategoriesModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'Categories',
    timestamps: false,
  });
  return Category;
}
module.exports = createCategoriesModel;