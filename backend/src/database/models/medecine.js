const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db');

class Medecine extends Model {}

Medecine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    tradeName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    genericName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Medecine',
    tableName: 'medecine',
    timestamps: false,
  }
);

module.exports = Medecine;
module.exports.default = Medecine;
