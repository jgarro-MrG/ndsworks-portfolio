module.exports = async function handler(request, response) {
  try {
    const { Sequelize } = require('sequelize');
    const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

    if (!connectionString) {
      return response.status(500).json({
        success: false,
        error: 'No database connection string found',
        env: {
          hasPostgresUrl: !!process.env.POSTGRES_URL_NON_POOLING,
          hasDatabaseUrl: !!process.env.DATABASE_URL
        }
      });
    }

    const sequelize = new Sequelize(connectionString, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });

    await sequelize.authenticate();

    response.status(200).json({
      success: true,
      message: 'Sequelize initialized and connected successfully'
    });

    await sequelize.close();
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};
