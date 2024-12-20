const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;
const PropertyType = require('./propertyType');  
const PropertyStatus = require('./propertyStatus')
const Agent = require('./agent')
const ImageProperty = require('./imageProperty')

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
      model: PropertyType,
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
      model: PropertyStatus,
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
      model: Agent,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
  },
  maxResidents:{
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'Property',
  timestamps: true,
});

Property.belongsTo(PropertyType, { foreignKey: 'propertyType' });
PropertyType.hasMany(Property, { foreignKey: 'propertyType' });

Property.belongsTo(PropertyStatus, { foreignKey: 'status' });
PropertyStatus.hasMany(Property, { foreignKey: 'status' });

Property.belongsTo(Agent, { foreignKey: 'agent' });
Agent.hasMany(Property, { foreignKey: 'agent' });

Property.hasMany(ImageProperty, { foreignKey: 'property'} )


module.exports = Property;
