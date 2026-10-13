async function up(queryInterface, Sequelize) {
  const exists = await queryInterface.tableExists('category');

  if (!exists) {
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      categoryName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      storageInstruction: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      AverageTaxRate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    });
  }
}

async function down(queryInterface) {
  await queryInterface.dropTable('category');
}

module.exports = { up, down };
module.exports.default = { up, down };
