const Rent = require('../models/rent')
const Property = require('../models/property')
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

    if (property.agent == agentId){
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
