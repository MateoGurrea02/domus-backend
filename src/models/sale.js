const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;
const Property = require('./property')
const Client = require('./client')
const SaleStatus = require('./saleStatus')

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  property: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Property,
      key: 'id'
    }
  },
  client: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SaleStatus,
      key: 'id'
    }
  }
}, {
    tableName: 'Sale',
    timestamps: true,
});

Sale.belongsTo(Property, { foreignKey: 'property' })
Sale.belongsTo(Client, { foreignKey: 'client' })
Sale.belongsTo(SaleStatus, { foreignKey: 'status' })

module.exports = Sale;
