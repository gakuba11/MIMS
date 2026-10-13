const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    storageInstruction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    AverageTaxRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: false,
  }
);

module.exports = Category;
module.exports.default = Category;
