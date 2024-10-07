const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const PropertyType = sequelize.define('PropertyType', {
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
  tableName: 'PropertyType',
});

module.exports = PropertyType
