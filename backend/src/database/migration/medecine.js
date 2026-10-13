async function up(queryInterface, Sequelize) {
  const exists = await queryInterface.tableExists('medecine');

  if (!exists) {
    await queryInterface.createTable('medecine', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      tradeName: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      genericName: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  }
}

async function down(queryInterface) {
  await queryInterface.dropTable('medecine');
}

module.exports = { up, down };
module.exports.default = { up, down };
