const Sale = require('../models/sale')
const Agent = require('../models/agent')
const Property = require('../models/property')
const jwt = require("jsonwebtoken");

const createSale = async (req, res) => {
  try {
    const headerAuth = req.headers['authorization']
    const payload = jwt.verify(headerAuth, process.env.JWT_SECRET);
    const userId = payload.id
    const agent = await Agent.findAll({
      where: {
        user: userId
      }
    })
    const agentId = agent[0].id

    const { property, client, date, amount, status } = req.body;

    const propertyModel = await Property.findByPk(property)

    if (propertyModel.agent == agentId){
      const sale = await Sale.create({ property, client, date, amount, status });
      res.status(201).json(sale);
    }
    else{
      throw 'El agente no es dueño de la propiedad'
    }
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id);

    if (!sale) {
      return res.status(404).json({ error: 'Alquiler no encontrado' });
    }

    res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo al alquiler' });
  }
};

const getSalesByAgent = async (req, res) => {
  try{
    const headerAuth = req.headers['authorization']
    const payload = jwt.verify(headerAuth, process.env.JWT_SECRET);
    const userId = payload.id
    const agent = await Agent.findAll({
      where: {
        user: userId
      }
    })
    const agentId = agent[0].id

    const properties = await Property.findAll({
      where: {
        agent: agentId
      }
    })

    let propertiesId = []
    properties.map((property) => {
      propertiesId.push(property.id)
    })

    const sales = await Sale.findAll({
      where: {
        property: propertiesId
      }
    })

    res.status(200).json(sales);
  }catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los alquileres' });
  }
} 

module.exports = { createSale, getSales, getSaleById, getSalesByAgent };
