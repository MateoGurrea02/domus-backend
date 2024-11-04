const Sale = require('../models/sale')
const Property = require('../models/property')
const { getAgentId } = require('../functions/getAgentId')
const { getUserType } = require('../functions/getUserType')
const Client = require('../models/client')
const SaleStatus = require('../models/saleStatus')
const PropertyType = require('../models/propertyType')
const PropertyStatus = require('../models/propertyStatus')
const Agent = require('../models/agent')
const User = require('../models/user')

const createSale = async (req, res) => {
  try {
    const agentId = await getAgentId(req)

    const { property, client, amount, status } = req.body;
    const date = Date.now()
    const propertyModel = await Property.findByPk(property)

    if (propertyModel.agent == agentId){
      const sale = await Sale.create({ property, client, date, amount, status });
      propertyModel.set({ status:2 })
      await propertyModel.save()
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
    const sales = await Sale.findAll({
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
    res.status(200).json(sales);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id,
      {
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
        },
        {
          model: Client,
          include: [{
            model: User,
            attributes: ['name', 'createdAt', 'updatedAt']
          }],
          attributes: ['id', 'user', 'createdAt', 'updatedAt']
        }]
      }
    );

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

    const sales = await Sale.findAll({
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
          }
        ]},
        {
          model: SaleStatus,
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

    res.status(200).json(sales);
  }catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los alquileres' });
  }
} 

const updateSale = async (req, res) => {
  try {
    const agentId = await getAgentId(req)
    const { id } = req.params;
    const sale = await Sale.findByPk(id);
    const propertySale = await Property.findByPk(sale.property)
    
    const { property, client, date, amount, status } = req.body;

    const propertyModel = await Property.findByPk(property)

    if (propertyModel.agent == agentId && propertySale.agent == agentId){
      sale.set({
        property: property,
        client: client,
        date: date,
        amount: amount,
        status: status
      })
      await sale.save()
      res.status(200).json(sale);
    }
    else{
      throw 'El agente no es dueño de la propiedad'
    }
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

const deleteSale = async (req, res) =>{
  try{
    const agentId = await getAgentId(req)
    const { id } = req.params;
    const sale = await Sale.findByPk(id);
    const property = await Property.findByPk(sale.property)
    const userType = await getUserType(req)
    
    if (property.agent == agentId || userType == 1){
      await sale.destroy()
      res.status(200).json({message: 'La venta fue borrada'});
    }
    else{
      throw 'El agente no es dueño de la propiedad'
    }
  } catch (error){
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

module.exports = { createSale, getSales, getSaleById, getSalesByAgent, updateSale, deleteSale };
