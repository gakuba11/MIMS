const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Pharmacy Management System API',
    version: '1.0.0',
    description: 'API documentation for the Pharmacy Management System.',
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Local backend server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      UserRegisterRequest: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string', example: 'john_doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', format: 'password', minLength: 8, example: 'Pass@1234' },
        },
      },
      UserLoginRequest: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', example: 'john_doe' },
          password: { type: 'string', format: 'password', example: 'Pass@1234' },
        },
      },
      UserSession: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          username: { type: 'string', example: 'john_doe' },
        },
      },
      AuthSuccess: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Login successful' },
          users: { $ref: '#/components/schemas/UserSession' },
        },
      },
      UserProfile: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'User profile' },
          users: { $ref: '#/components/schemas/UserSession' },
        },
      },
      ApiError: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Username and password are required' },
        },
      },
      CategoryInput: {
        type: 'object',
        required: ['categoryName', 'storageInstruction', 'AverageTaxRate'],
        properties: {
          categoryName: { type: 'string', example: 'Antibiotics' },
          storageInstruction: { type: 'string', example: 'Store below 25°C' },
          AverageTaxRate: { type: 'number', example: 5.5 },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          categoryName: { type: 'string', example: 'Antibiotics' },
          storageInstruction: { type: 'string', example: 'Store below 25°C' },
          AverageTaxRate: { type: 'number', example: 5.5 },
        },
      },
      MedicineInput: {
        type: 'object',
        required: ['categoryId', 'tradeName', 'genericName', 'unitPrice'],
        properties: {
          categoryId: { type: 'integer', example: 1 },
          tradeName: { type: 'string', example: 'Amoxicillin 500' },
          genericName: { type: 'string', example: 'Amoxicillin' },
          unitPrice: { type: 'number', example: 12.5 },
        },
      },
      Medicine: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          categoryId: { type: 'integer', example: 1 },
          categoryName: { type: 'string', example: 'Antibiotics' },
          tradeName: { type: 'string', example: 'Amoxicillin 500' },
          genericName: { type: 'string', example: 'Amoxicillin' },
          unitPrice: { type: 'number', example: 12.5 },
        },
      },
      InventoryStockInput: {
        type: 'object',
        required: ['medecineId', 'quantityInHand', 'expiryDate'],
        properties: {
          medecineId: { type: 'integer', example: 1 },
          quantityInHand: { type: 'integer', example: 50 },
          expiryDate: { type: 'string', format: 'date', example: '2027-12-31' },
        },
      },
      InventoryStock: {
        type: 'object',
        properties: {
          stockNumber: { type: 'integer', example: 1 },
          medecineId: { type: 'integer', example: 1 },
          quantityInHand: { type: 'integer', example: 50 },
          expiryDate: { type: 'string', format: 'date', example: '2027-12-31' },
          medicine: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              tradeName: { type: 'string', example: 'Amoxicillin 500' },
              genericName: { type: 'string', example: 'Amoxicillin' },
              unitPrice: { type: 'number', example: 12.5 },
            },
          },
        },
      },
      SaleInput: {
        type: 'object',
        required: ['medecineId', 'quantitySold', 'totalAmount', 'stock_id'],
        properties: {
          medecineId: { type: 'integer', example: 1 },
          quantitySold: { type: 'integer', example: 10 },
          totalAmount: { type: 'number', example: 125.0 },
          stock_id: { type: 'integer', example: 1 },
        },
      },
      Sale: {
        type: 'object',
        properties: {
          salesNumber: { type: 'integer', example: 1 },
          medecineId: { type: 'integer', example: 1 },
          quantitySold: { type: 'integer', example: 10 },
          totalAmount: { type: 'number', example: 125.0 },
          stock_id: { type: 'integer', example: 1 },
          remaining_stock: { type: 'integer', example: 40, nullable: true },
          saleDate: { type: 'string', format: 'date-time', example: '2026-10-12T12:00:00.000Z' },
        },
      },
    },
  },
  tags: [
    { name: 'Users', description: 'User authentication and account operations' },
    { name: 'Categories', description: 'Operations related to medicine categories' },
    { name: 'Medicines', description: 'Operations related to medicines' },
    { name: 'Inventory', description: 'Operations related to inventory stock' },
    { name: 'Sales', description: 'Operations related to sales transactions' },
  ],
  paths: {
    '/api/users/register': {
      post: {
        tags: ['Users'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserRegisterRequest' },
            },
          },
        },
        responses: {
          201: { description: 'User created successfully' },
          400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          409: { description: 'User already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/users/login': {
      post: {
        tags: ['Users'],
        summary: 'Login a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserLoginRequest' },
            },
          },
        },
        responses: {
          200: { description: 'Login successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthSuccess' } } } },
          400: { description: 'Missing fields', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          401: { description: 'Invalid username or password', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/users/logout': {
      post: {
        tags: ['Users'],
        summary: 'Logout current user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Logout successful' },
          500: { description: 'Logout error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/users/profile': {
      get: {
        tags: ['Users'],
        summary: 'Get current profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Authenticated user profile', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserProfile' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/categories': {
      post: {
        tags: ['Categories'],
        summary: 'Create a category',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryInput' } } },
        },
        responses: {
          201: { description: 'Category created' },
          400: { description: 'Missing required values', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      get: {
        tags: ['Categories'],
        summary: 'List all categories',
        responses: {
          200: { description: 'List of categories', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/categories/{id}': {
      put: {
        tags: ['Categories'],
        summary: 'Update a category',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryInput' } } },
        },
        responses: {
          200: { description: 'Category updated' },
          404: { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      delete: {
        tags: ['Categories'],
        summary: 'Delete a category',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Category deleted' },
          404: { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/medecines': {
      post: {
        tags: ['Medicines'],
        summary: 'Create a medicine',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicineInput' } } },
        },
        responses: {
          201: { description: 'Medicine created' },
          400: { description: 'Missing required fields', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      get: {
        tags: ['Medicines'],
        summary: 'List all medicines',
        responses: {
          200: { description: 'List of medicines', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Medicine' } } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/medecines/{id}': {
      put: {
        tags: ['Medicines'],
        summary: 'Update a medicine',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MedicineInput' } } },
        },
        responses: {
          200: { description: 'Medicine updated' },
          404: { description: 'Medicine not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      delete: {
        tags: ['Medicines'],
        summary: 'Delete a medicine',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Medicine deleted' },
          404: { description: 'Medicine not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/inventory': {
      post: {
        tags: ['Inventory'],
        summary: 'Create inventory stock',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/InventoryStockInput' } } },
        },
        responses: {
          201: { description: 'Inventory stock created' },
          400: { description: 'Invalid inventory payload', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          404: { description: 'Medicine not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      get: {
        tags: ['Inventory'],
        summary: 'List inventory stock',
        responses: {
          200: { description: 'Inventory stock list', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/InventoryStock' } } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/inventory/{stockNumber}': {
      put: {
        tags: ['Inventory'],
        summary: 'Update inventory stock',
        parameters: [{ in: 'path', name: 'stockNumber', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/InventoryStockInput' } } },
        },
        responses: {
          200: { description: 'Inventory stock updated' },
          400: { description: 'Invalid quantity', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          404: { description: 'Inventory stock or medicine not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      delete: {
        tags: ['Inventory'],
        summary: 'Delete inventory stock',
        parameters: [{ in: 'path', name: 'stockNumber', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Inventory stock deleted' },
          404: { description: 'Inventory stock not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/sales': {
      post: {
        tags: ['Sales'],
        summary: 'Create a sale',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/SaleInput' } } },
        },
        responses: {
          201: { description: 'Sale recorded successfully' },
          400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          404: { description: 'Medicine or stock not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      get: {
        tags: ['Sales'],
        summary: 'List sales',
        responses: {
          200: { description: 'List of sales', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Sale' } } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
    '/api/sales/{salesNumber}': {
      put: {
        tags: ['Sales'],
        summary: 'Update a sale',
        parameters: [{ in: 'path', name: 'salesNumber', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/SaleInput' } } },
        },
        responses: {
          200: { description: 'Sale updated' },
          400: { description: 'Invalid sale payload', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          404: { description: 'Sale not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
      delete: {
        tags: ['Sales'],
        summary: 'Delete a sale',
        parameters: [{ in: 'path', name: 'salesNumber', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Sale deleted' },
          404: { description: 'Sale not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
          500: { description: 'Database error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } } },
        },
      },
    },
  },
};

const swaggerSpecs = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: [],
});

module.exports = swaggerSpecs;