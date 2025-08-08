const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: 'Jorge Garro',
  },
  // The 'date' field from Mongoose (createdAt/updatedAt) is handled automatically by Sequelize
}, {
  timestamps: true,
});

module.exports = { Post };