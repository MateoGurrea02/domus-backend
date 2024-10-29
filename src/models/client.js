const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;
const User = require('./user')

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'Client',
  timestamps: true,
});

Client.belongsTo(User, { foreignKey: 'user' })

module.exports = Client;
