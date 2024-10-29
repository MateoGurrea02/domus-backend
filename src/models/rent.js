const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;
const Property = require('./property')
const Client = require('./client')
const RentStatus = require('./rentStatus')

const Rent = sequelize.define('Rent', {
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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: RentStatus,
      key: 'id'
    }
  }
}, {
    tableName: 'Rent',
    timestamps: true,
});

Rent.belongsTo(Property, { foreignKey: 'property' })
Rent.belongsTo(Client, { foreignKey: 'client' })
Rent.belongsTo(RentStatus, { foreignKey: 'status' })
module.exports = Rent;
