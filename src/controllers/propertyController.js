const Property = require('../models/property')
const Agent = require('../models/agent')
const jwt = require("jsonwebtoken");

const createProperty = async (req, res) => {
  try {
    const headerAuth = req.headers['authorization']
    const payload = jwt.verify(headerAuth, process.env.JWT_SECRET);
    const userId = payload.id
    const agentModel = await Agent.findAll({
      where: {
        user: userId
      }
    })
    const agent = agentModel[0].id
    
    const { address, propertyType, price, status, description, size } = req.body;
    const property = await Property.create({ address, propertyType, price, status, description, size, agent });
    res.status(201).json(property);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo las propiedades' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: 'Propiedad no encontrada' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo la propiedad' });
  }
};

const getPropertiesByAgent = async (req, res) =>{
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

    res.status(200).json(properties);
  }catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo las propiedades' });
  }
}

const deleteProperty = async (req, res) => {
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
    const { propertyId } = req.params;
    const property = await Property.findByPk(propertyId)
    if (agentId == property.agent){
      Property.destroy({
        where: {
          id: propertyId
        }
      }).then(() => {
        return res.status(200).json({response: 'Propiedad borrada'})
      }).catch((error) => {
        res.status(500).json({ error: error });
      });
    }
    else{
      throw 'No es dueño de la propiedad'
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

module.exports = { createProperty, getProperties, getPropertyById, getPropertiesByAgent, deleteProperty };
