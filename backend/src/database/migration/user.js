const sequelize = require('../../config/db');

const runMigrations = async () => {
  await sequelize.authenticate();

  const migrationFiles = [
    './users.js',
    './category.js',
    './medecine.js',
    './inventorystock.js',
    './sales.js',
  ];

  for (const migrationFile of migrationFiles) {
    const migration = require(migrationFile);
    const migrationUp = migration.up ?? migration.default;

    if (typeof migrationUp === 'function') {
      await migrationUp(sequelize.getQueryInterface(), sequelize.constructor);
    }
  }

  console.log('Database migrations completed successfully.');
};

const createDatabaseTables = runMigrations;
const createUserTable = runMigrations;

module.exports = runMigrations;
module.exports.default = runMigrations;
module.exports.runMigrations = runMigrations;
module.exports.createDatabaseTables = createDatabaseTables;
module.exports.createUserTable = createUserTable;