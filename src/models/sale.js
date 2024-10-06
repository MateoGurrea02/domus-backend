const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const Sale = sequelize.define('Sale', {
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
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  status: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'SaleStatus',
      key: 'id'
    }
  }
}, {
    tableName: 'Sale',
    timestamps: true,
});

module.exports = Sale;
