const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;
const UserType = require('./userType')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
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
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserType,
      key: 'id'
    }
  }
}, {
  tableName: 'User',
  timestamps: true,
});

User.belongsTo(UserType, { foreignKey: 'type' })

module.exports = User;
