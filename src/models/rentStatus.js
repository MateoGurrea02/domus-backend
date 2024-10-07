const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const RentStatus = sequelize.define('RentStatus', {
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
  tableName: 'RentStatus'
});

module.exports = RentStatus
