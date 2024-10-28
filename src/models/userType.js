const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const UserType = sequelize.define('UserType', {
  id: {
    type: DataTypes.INTEGER,
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
  timestamps: false,
});

module.exports = UserType
