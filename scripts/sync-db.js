require('dotenv').config();
require('dotenv').config();
const { sequelize } = require('../lib/db.js');

// Import all models to ensure they are registered with Sequelize before syncing
require('../lib/models/post.model.js');
const { Resume } = require('../lib/models/resume.model.js');
const { Experience } = require('../lib/models/experience.model.js');
const { Education } = require('../lib/models/education.model.js');
const { Skill } = require('../lib/models/skill.model.js');

async function syncDatabase() {
  console.log('Starting database synchronization...');
  try {
    // { force: true } will drop tables if they already exist.
    // This is useful for development to ensure a clean schema,
    // but it is a destructive operation.
    // By removing `{ force: true }`, this script becomes non-destructive.
    // It will create tables if they don't exist, but won't delete existing data.
    await sequelize.sync();
    console.log('Database and tables created successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
