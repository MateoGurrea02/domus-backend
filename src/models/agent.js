const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;

const Agent = sequelize.define('Agent', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  tableName: 'Agent',
  timestamps: true,
});

module.exports = Agent
