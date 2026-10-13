async function up(queryInterface, Sequelize) {
  const exists = await queryInterface.tableExists('sales');

  if (!exists) {
    await queryInterface.createTable('sales', {
      salesNumber: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      medecineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medecine',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantitySold: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'inventorystock',
          key: 'stockNumber',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      remaining_stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  }
}

async function down(queryInterface) {
  await queryInterface.dropTable('sales');
}

module.exports = { up, down };
module.exports.default = { up, down };
