const PropertyType = require('../models/propertyType')
const UserType = require('../models/userType')

const getPropertyTypes = async (req, res) => {
  try {
    const types = await PropertyType.findAll();
    res.status(200).json(types);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getUserTypes = async (req, res) => {
  try {
    const types = await UserType.findAll();
    res.status(200).json(types);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

module.exports = { getPropertyTypes, getUserTypes };
