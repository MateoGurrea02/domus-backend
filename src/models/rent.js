const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const Rent = sequelize.define('Rent', {
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
  monthlyAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false
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
    tableName: 'Rent',
    timestamps: true,
});

module.exports = Rent;
