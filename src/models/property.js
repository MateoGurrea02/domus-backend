const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PropertyType',
      key: 'id'
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PropertyStatus',
      key: 'id'
    }
  },
  description: {
    type: DataTypes.TEXT,
  },
  size: {
    type: DataTypes.DECIMAL,
  },
  agent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  tableName: 'Property',
  timestamps: true,
});

module.exports = Property;
