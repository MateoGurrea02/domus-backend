const sequelize = require('./sequelize.js').sequelize;
const Sequelize = require('sequelize')
const propertyTypes = require('./propertyType')

propertyTypes.sync().then((result) =>{
  console.log(result)
})

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
