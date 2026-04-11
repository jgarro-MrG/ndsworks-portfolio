require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const { sequelize } = require('../lib/db.js');
const { ProjectConfig } = require('../lib/models/projectConfig.model.js');

const projects = [
  {
    repoName: 'unimoji',
    imageUrl: '/img/projects/unimoji.png',
    active: true,
    displayOrder: 10,
  },
  {
    repoName: 'onedrive-to-gdrive',
    imageUrl: '/img/projects/onedrive-gdrive-migration.png',
    active: true,
    displayOrder: 20,
  },
];

async function addProjects() {
  console.log('Adding projects...');
  try {
    for (const p of projects) {
      const [record, created] = await ProjectConfig.findOrCreate({
        where: { repoName: p.repoName },
        defaults: p,
      });
      if (created) {
        console.log(`✅ Project "${record.repoName}" created.`);
      } else {
        console.log(`ℹ️  Project "${record.repoName}" already exists — skipping.`);
      }
    }
  } catch (error) {
    console.error('❌ Error adding projects:', error);
  } finally {
    await sequelize.close();
    console.log('Done.');
  }
}

addProjects();
