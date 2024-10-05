const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const userType = sequelize.define('UserType', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'UserType',
  timestamps: true
});

module.exports = userType
