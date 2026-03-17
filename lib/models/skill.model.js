const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_es: {
    type: DataTypes.STRING,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  details_es: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

module.exports = { Skill };