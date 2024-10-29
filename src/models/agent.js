const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;
const User = require('./user.js')

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
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'Agent',
  timestamps: true,
});

Agent.belongsTo(User, { foreignKey: 'user' })

module.exports = Agent
