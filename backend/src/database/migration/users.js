async function up(queryInterface, Sequelize) {
  const exists = await queryInterface.tableExists('users');

  if (!exists) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  }
}

async function down(queryInterface) {
  await queryInterface.dropTable('users');
}

module.exports = { up, down };
module.exports.default = { up, down };
