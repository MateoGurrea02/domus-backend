const Property = require('../models/property')
const { Op } = require('sequelize');
const { getAgentId } = require('../functions/getAgentId')
const PropertyType = require('../models/propertyType')
const PropertyStatus = require('../models/propertyStatus')
const Agent = require('../models/agent')
const User = require('../models/user')
const Sale = require('../models/sale')
const SaleStatus = require('../models/saleStatus')

const createProperty = async (req, res) => {
  try {
    const agent = await getAgentId(req)
    
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
    const properties = await Property.findAll({
      attributes: ['id', 'address', 'price', 'description', 'size', 'createdAt', 'updatedAt'],
      include: [
      {
        model: PropertyType,
        attributes: ['id', 'type']
      },
      {
        model: PropertyStatus,
        attributes: ['id', 'status']
      },
      {
        model: Agent,
        include: [{
          model: User,
          attributes: ['id', 'name', 'createdAt', 'updatedAt']
        }],
        attributes: ['id', 'createdAt', 'updatedAt']
      }]
    });
    res.status(200).json(properties);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo las propiedades' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id,
      {
        attributes: ['id', 'address', 'price', 'description', 'size', 'createdAt', 'updatedAt'],
        include: [
        {
          model: PropertyType,
          attributes: ['id', 'type']
        },
        {
          model: PropertyStatus,
          attributes: ['id', 'status']
        },
        {
          model: Agent,
          include: [{
            model: User,
            attributes: ['id', 'name', 'createdAt', 'updatedAt']
          }],
          attributes: ['id', 'createdAt', 'updatedAt']
        }
      ]}
    );

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
    const agentId = await getAgentId(req)

    const properties = await Property.findAll({
      attributes: ['id', 'address', 'price', 'description', 'size', 'createdAt', 'updatedAt'],
      include: [
      {
        model: PropertyType,
        attributes: ['id', 'type']
      },
      {
        model: PropertyStatus,
        attributes: ['id', 'status']
      },
      {
        model: Agent,
        include: [{
          model: User,
          attributes: ['id', 'name', 'createdAt', 'updatedAt']
        }],
        attributes: ['id', 'createdAt', 'updatedAt']
      }],
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

const getPropertiesByClient = async (req, res) => {
  try{
    const id = req.params.id
    console.log(id)
    const clientSales = await Sale.findAll({
        attributes: ['id', 'date', 'amount'],
        include: [
        {
          model: Property,
          attributes: ['id', 'address', 'price', 'description', 'size', 'createdAt', 'updatedAt'],
          include: [
          {
            model: PropertyType,
            attributes: ['id', 'type']
          },
          {
            model: PropertyStatus,
            attributes: ['id', 'status']
          },
          {
            model: Agent,
            include: [{
              model: User,
              attributes: ['id', 'name', 'createdAt', 'updatedAt']
            }],
            attributes: ['id', 'createdAt', 'updatedAt']
          }
        ]},
        {
          model: SaleStatus,
          attributes: ['id', 'type']
        }],
      where:{
        client: id
      }
    })

    res.status(200).json(clientSales);
  }catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

const updateProperty = async (req, res) => {
  try {
    const agentId = await getAgentId(req)
    const { id } = req.params;
    const property = await Property.findByPk(id);
    
    const { address, propertyType, price, status, description, size } = req.body;

    if (property.agent == agentId){
      property.set({
        address: address,
        propertyType: propertyType,
        price: price,
        status: status,
        description: description,
        size: size,
      })
      await property.save()
      res.status(200).json(property);
    }
    else{
      throw 'El agente no es dueño de la propiedad'
    }
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

const deleteProperty = async (req, res) => {
  try {
    const agentId = await getAgentId(req)

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

const filterProperty = async (req, res) => {
  try{
    const filters = req.body;
    let where = {}
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      
      // Check if the value is an object (for complex conditions like { gte, lte })
      if (typeof value === 'object' && value !== null) {
        where[key] = {};
        
        // Dynamically add conditions like gte, lte, etc.
        Object.keys(value).forEach(condition => {
          if (condition === 'gte') {
            where[key][Op.gte] = value[condition];
          }
          if (condition === 'lte') {
            where[key][Op.lte] = value[condition];
          }
        });
      } else {
        // If the value is a simple value, just add it as a direct match
        where[key] = value;
      }
    });
    const properties = await Property.findAll({
      attributes: ['id', 'address', 'price', 'description', 'size', 'createdAt', 'updatedAt'],
      include: [
      {
        model: PropertyType,
        attributes: ['id', 'type']
      },
      {
        model: PropertyStatus,
        attributes: ['id', 'status']
      },
      {
        model: Agent,
        include: [{
          model: User,
          attributes: ['id', 'name', 'createdAt', 'updatedAt']
        }],
        attributes: ['id', 'createdAt', 'updatedAt']
      }],
      where: where
    });
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = { createProperty, getProperties, getPropertyById, getPropertiesByAgent, getPropertiesByClient, deleteProperty, filterProperty, updateProperty };
