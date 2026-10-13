require('./models/user');
require('./models/category');
require('./models/medecine');
require('./models/inventoryStock');
require('./models/sale');

const User = require('./models/user');
const Category = require('./models/category');
const Medecine = require('./models/medecine');
const InventoryStock = require('./models/inventoryStock');
const Sale = require('./models/sale');

Category.hasMany(Medecine, {
  foreignKey: 'categoryId',
  as: 'medicines',
});

Medecine.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

Medecine.hasMany(InventoryStock, {
  foreignKey: 'medecineId',
  as: 'inventoryStocks',
});

InventoryStock.belongsTo(Medecine, {
  foreignKey: 'medecineId',
  as: 'medicine',
});

Medecine.hasMany(Sale, {
  foreignKey: 'medecineId',
  as: 'sales',
});

Sale.belongsTo(Medecine, {
  foreignKey: 'medecineId',
  as: 'medicine',
});

InventoryStock.hasMany(Sale, {
  foreignKey: 'stock_id',
  as: 'sales',
});

Sale.belongsTo(InventoryStock, {
  foreignKey: 'stock_id',
  as: 'inventoryStock',
});

module.exports = { User, Category, Medecine, InventoryStock, Sale };