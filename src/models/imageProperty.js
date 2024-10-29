const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js').sequelize;
const Property = require('./property.js')

const ImageProperty = sequelize.define('ImageProperty', {
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
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'ImageProperty'
});

module.exports = ImageProperty
