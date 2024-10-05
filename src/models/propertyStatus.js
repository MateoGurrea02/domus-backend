const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const propertyStatus = sequelize.define('PropertyStatus', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'PropertyStatus',
  timestamps: true
});

module.exports = propertyStatus
