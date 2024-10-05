const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const rentStatus = sequelize.define('RentStatus', {
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
  tableName: 'RentStatus',
  timestamps: true
});

module.exports = rentStatus
