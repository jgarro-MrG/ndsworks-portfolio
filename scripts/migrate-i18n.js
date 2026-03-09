require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const { sequelize } = require('../lib/db.js');
const { DataTypes } = require('sequelize');

async function migrate() {
  const qi = sequelize.queryInterface;
  console.log('Running i18n migration...');

  const addIfMissing = async (table, column, type) => {
    try {
      await qi.addColumn(table, column, type);
      console.log(`  Added ${table}.${column}`);
    } catch (e) {
      if (e.message && e.message.includes('already exists')) {
        console.log(`  ${table}.${column} already exists, skipping`);
      } else {
        throw e;
      }
    }
  };

  await addIfMissing('Posts', 'title_es', { type: DataTypes.STRING, allowNull: true });
  await addIfMissing('Posts', 'content_es', { type: DataTypes.TEXT, allowNull: true });
  await addIfMissing('Resumes', 'title_es', { type: DataTypes.STRING, allowNull: true });
  await addIfMissing('Resumes', 'summary_es', { type: DataTypes.TEXT, allowNull: true });
  await addIfMissing('Experiences', 'details_es', { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true });
  await addIfMissing('Education', 'degree_es', { type: DataTypes.STRING, allowNull: true });
  await addIfMissing('Education', 'notes_es', { type: DataTypes.STRING, allowNull: true });
  await addIfMissing('Skills', 'details_es', { type: DataTypes.TEXT, allowNull: true });

  console.log('\nMigration complete.');
  await sequelize.close();
}

migrate().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});
