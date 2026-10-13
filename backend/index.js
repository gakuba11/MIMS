require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger');
const sequelize = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const medecineRoutes = require('./src/routes/medecineRoutes');
const inventoryStockRoutes = require('./src/routes/inventoryStockRoutes');
const salesRoutes = require('./src/routes/salesRoutes');
require('./src/database');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', medecineRoutes);
app.use('/api', inventoryStockRoutes);
app.use('/api', salesRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;