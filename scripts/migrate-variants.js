require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const { sequelize } = require('../lib/db.js');
require('../lib/models/resumeVariant.model.js');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    await sequelize.sync({ alter: true });
    console.log('✅ ResumeVariants table created/updated.');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
})();
