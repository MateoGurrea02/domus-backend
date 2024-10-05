const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  timestamps: true,
});

module.exports = User;
