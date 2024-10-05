const { DataTypes, BIGINT } = require('sequelize');
const propertyType = require('./propertyType');
const sequelize = require('./index').sequelize;

const property = sequelize.define('Property', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'PropertyTypes',
      key: 'id'
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BIGINT,
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
  }
}, {
  timestamps: true,
});

module.exports = Property;
