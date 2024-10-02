const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const property = sequelize.define('Property', {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  }
}, {
  timestamps: true,
});

module.exports = User;
