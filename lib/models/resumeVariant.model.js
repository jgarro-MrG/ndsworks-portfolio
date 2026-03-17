const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const ResumeVariant = sequelize.define('ResumeVariant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetRole: {
    type: DataTypes.STRING,
  },
  targetCompany: {
    type: DataTypes.STRING,
  },
  customSummary: {
    type: DataTypes.TEXT,
  },
  customSummary_es: {
    type: DataTypes.TEXT,
  },
  config: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  timestamps: true,
});

module.exports = { ResumeVariant };
