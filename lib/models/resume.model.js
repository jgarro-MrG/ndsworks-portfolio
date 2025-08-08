const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const { Experience } = require('./experience.model.js');
const { Education } = require('./education.model.js');
const { Skill } = require('./skill.model.js');

const Resume = sequelize.define('Resume', {
  // Adding a primary key for consistency, even if there's only one resume.
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Contact info can remain as a simple JSON object
  contact: {
    type: DataTypes.JSONB,
  },
}, {
  timestamps: true,
});


// --- Define Associations ---

// Resume has many Experience records
Resume.hasMany(Experience, {
  foreignKey: 'resumeId',
  as: 'experience', // This alias is important for the API include
});
Experience.belongsTo(Resume, {
  foreignKey: 'resumeId',
});

// Resume has many Education records
Resume.hasMany(Education, {
  foreignKey: 'resumeId',
  as: 'education',
});
Education.belongsTo(Resume, {
  foreignKey: 'resumeId',
});

// Resume has many Skill records
Resume.hasMany(Skill, {
  foreignKey: 'resumeId',
  as: 'skills',
});
Skill.belongsTo(Resume, {
  foreignKey: 'resumeId',
});

module.exports = { Resume }; // Only export Resume to avoid circular dependency issues in other files