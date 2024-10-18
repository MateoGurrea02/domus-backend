const Rent = require('../models/rent')
const Agent = require('../models/agent')
const Property = require('../models/property')
const jwt = require("jsonwebtoken");

const createRent = async (req, res) => {
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

    const { property, client, startDate, finishDate, monthlyAmount, status } = req.body;

    const propertyModel = await Property.findByPk(property)

    if (propertyModel.agent == agentId){
      const rent = await Rent.create({ property, client, startDate, finishDate, monthlyAmount, status });
      res.status(201).json(rent);
    }
    else{
      throw 'El agente no es dueño de la propiedad'
    }
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getRents = async (req, res) => {
  try {
    const rents = await Rent.findAll();
    res.status(200).json(rents);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getRentById = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await Rent.findByPk(id);

    if (!rent) {
      return res.status(404).json({ error: 'Alquiler no encontrado' });
    }

    res.status(200).json(rent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo al alquiler' });
  }
};

const getRentsByAgent = async (req, res) =>{
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

    const rents = await Rent.findAll({
      where: {
        property: propertiesId
      }
    })

    res.status(200).json(rents);
  }catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los alquileres' });
  }
}

module.exports = { createRent, getRents, getRentById, getRentsByAgent };
