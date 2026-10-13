async function up(queryInterface, Sequelize) {
  const exists = await queryInterface.tableExists('inventorystock');

  if (!exists) {
    await queryInterface.createTable('inventorystock', {
      stockNumber: {
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
      quantityInHand: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      expiryDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  }
}

async function down(queryInterface) {
  await queryInterface.dropTable('inventorystock');
}

module.exports = { up, down };
module.exports.default = { up, down };
