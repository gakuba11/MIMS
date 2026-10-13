const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db');

class InventoryStock extends Model {}

InventoryStock.init(
  {
    stockNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    medecineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medecine',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    quantityInHand: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'InventoryStock',
    tableName: 'inventorystock',
    timestamps: false,
  }
);

module.exports = InventoryStock;
module.exports.default = InventoryStock;
