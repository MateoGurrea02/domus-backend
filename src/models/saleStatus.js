const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const SaleStatus = sequelize.define('SaleStatus', {
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
  tableName: 'SaleStatus'
});

module.exports = SaleStatus
