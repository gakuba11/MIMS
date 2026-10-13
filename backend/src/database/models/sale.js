const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db');

class Sale extends Model {}

Sale.init(
  {
    salesNumber: {
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
    quantitySold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventorystock',
        key: 'stockNumber',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    remaining_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Sale',
    tableName: 'sales',
    timestamps: false,
  }
);

module.exports = Sale;
module.exports.default = Sale;
