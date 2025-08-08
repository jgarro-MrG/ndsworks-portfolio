const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  githubLink: {
    type: DataTypes.STRING,
  },
  // The 'date' field from Mongoose (createdAt/updatedAt) is handled automatically by Sequelize
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
});

module.exports = { Project };