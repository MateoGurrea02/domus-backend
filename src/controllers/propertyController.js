const Property = require('../models/property')

const createProperty = async (req, res) => {
  try {
    const { address, propertyType, price, status, description, size, owner } = req.body;
    const property = await Property.create({ address, propertyType, price, status, description, size, owner });
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

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    Property.destroy({
      where: {
        id: id
      }
    }).then(() => {
      return res.status(200).json({response: 'Propiedad borrada'})
    }).catch((error) => {
      res.status(500).json({ error: error });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo la propiedad' });
  }
};

module.exports = { createProperty, getProperties, getPropertyById, deleteProperty };
