const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Experience = sequelize.define('Experience', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  period: {
    type: DataTypes.STRING,
  },
  details: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = { Experience };