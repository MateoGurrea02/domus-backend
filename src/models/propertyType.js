const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const PropertyType = sequelize.define('PropertyType', {
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
  tableName: 'PropertyType',
  timestamps: false
});

module.exports = PropertyType
