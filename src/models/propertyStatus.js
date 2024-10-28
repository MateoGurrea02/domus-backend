const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const PropertyStatus = sequelize.define('PropertyStatus', {
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
  tableName: 'PropertyStatus',
  timestamps: false
});

module.exports = PropertyStatus
