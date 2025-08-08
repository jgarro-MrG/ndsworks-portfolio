const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Education = sequelize.define('Education', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

module.exports = { Education };