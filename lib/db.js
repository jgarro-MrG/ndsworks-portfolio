const { Sequelize } = require('sequelize');

// Explicitly require pg before Sequelize to fix serverless bundling issue
// This prevents "Please install pg package manually" error in Vercel
require('pg');

// When using Vercel, it's recommended to use the non-pooling connection string
// from Serverless Functions. We'll prioritize Vercel's specific variable if it exists.
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Database connection string is missing. Please set POSTGRES_URL_NON_POOLING or DATABASE_URL in your Vercel project settings.');
}

const config = {
  dialect: 'postgres',
};

// For production environments (like Vercel), cloud databases require SSL.
// This configuration is generally needed for third-party Postgres providers.
// Vercel's own Postgres includes SSL config in its connection string, but
// adding this is safe and provides compatibility with other providers.
if (isProduction) {
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This may be needed to connect to some DBs
    },
  };
}

// Initialize Sequelize once and export the instance.
// It will be reused on subsequent function invocations.
const sequelize = new Sequelize(connectionString, config);

module.exports = { sequelize };
