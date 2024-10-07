const Property = require('../models/property')

const createProperty = async (req, res) => {
  try {
    const { address, propertyType, price, status, description, size, owner } = req.body;
    const property = await Property.create({ address, propertyType, price, status, description, size, owner });
    res.status(201).json(property);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error creando el usuario' });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};


const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo el usuario' });
  }
};

module.exports = { createProperty, getProperties, getPropertyById };
