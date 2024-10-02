const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const propertyType = sequelize.define('PropertyType', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = User;
