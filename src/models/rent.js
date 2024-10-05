const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const rent = sequelize.define('Rent', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  property: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'Property',
      key: 'id'
    }
  },
  client: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'Client',
      key: 'id'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finishDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  monthlyPrice: {
    type: DataTypes.DECIMAL,
  },
  status: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'RentStatus',
      key: 'id'
    }
  }
}, {
  timestamps: true,
});

module.exports = rent;
