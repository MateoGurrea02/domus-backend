const Rent = require('../models/rent')
const Property = require('../models/property')
const Client = require('../models/client')
const RentStatus = require('../models/rentStatus')
const PropertyType = require('../models/propertyType')
const PropertyStatus = require('../models/propertyStatus')
const Agent = require('../models/agent')
const User = require('../models/user')
const { getAgentId } = require('../functions/getAgentId')

const createRent = async (req, res) => {
  try {
    const agentId = await getAgentId(req)

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
    const rents = await Rent.findAll({
      attributes: ['id', 'startDate', 'finishDate', 'monthlyAmount'],
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
        model: RentStatus,
        attributes: ['id', 'type']
      },
      {
        model: Client,
        include: [{
          model: User,
          attributes: ['name', 'createdAt', 'updatedAt']
        }],
        attributes: ['id', 'user', 'createdAt', 'updatedAt']
      }]
    });
    res.status(200).json(rents);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getRentById = async (req, res) => {
  try {
    const { id } = req.params;
    const rent = await Rent.findByPk(id,{
      attributes: ['id', 'startDate', 'finishDate', 'monthlyAmount'],
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
        model: RentStatus,
        attributes: ['id', 'type']
      },
      {
        model: Client,
        include: [{
          model: User,
          attributes: ['name', 'createdAt', 'updatedAt']
        }],
        attributes: ['id', 'user', 'createdAt', 'updatedAt']
      }]
    });

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
    const agentId = await getAgentId(req)

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
      attributes: ['id', 'startDate', 'finishDate', 'monthlyAmount'],
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
        }
       ]},
      {
        model: RentStatus,
        attributes: ['id', 'type']
      },
      {
        model: Client,
        include: [{
          model: User,
          attributes: ['name', 'createdAt', 'updatedAt']
        }],
        attributes: ['id', 'user', 'createdAt', 'updatedAt']
      }],
      where: {
        property: propertiesId
      }
    })

    res.status(200).json(rents);
  }catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

const updateRent = async (req, res) => {
  try {
    const agentId = await getAgentId(req)
    const { id } = req.params;
    const rent = await Rent.findByPk(id);
    const propertyRent = await Property.findByPk(rent.property)
    
    const { property, client, startDate, finishDate, monthlyAmount, status } = req.body;

    const propertyModel = await Property.findByPk(property)

    if (propertyModel.agent == agentId && propertyRent.agent == agentId){
      rent.set({
        property: property,
        client: client,
        startDate: startDate,
        finishDate: finishDate,
        monthlyAmount: monthlyAmount,
        status: status
      })
      await rent.save()
      res.status(200).json(rent);
    }
    else{
      throw 'El agente no es dueño de la propiedad'
    }
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

const deleteRent = async (req, res) =>{
  try{
    const agentId = await getAgentId(req)
    const { id } = req.params;
    const rent = await Rent.findByPk(id);
    const property = await Property.findByPk(rent.property)
    const agent = await Agent.findByPk(agentId)
    const user = await User.findByPk(agent.user)
    
    if (property.agent == agentId || user.type == 1){
      await rent.destroy()
      res.status(200).json({message: 'El alquiler fue borrado'});
    }
    else{
      throw 'El agente no es dueño de la propiedad'
    }
  } catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

module.exports = { createRent, getRents, getRentById, getRentsByAgent, updateRent, deleteRent };
