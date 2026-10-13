const sequelize = require('../config/db');
require('../database');
const { createDatabaseTables } = require('../database/migration/user');

const syncDatabase = async () => {
  try {
    console.log('Synchronizing database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await createDatabaseTables();
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
};

syncDatabase();

