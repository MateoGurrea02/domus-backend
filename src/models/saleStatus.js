const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const SaleStatus = sequelize.define('SaleStatus', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'SaleStatus',
  timestamps: false,
});

module.exports = SaleStatus
