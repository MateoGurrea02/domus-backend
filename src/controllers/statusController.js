const PropertyStatus = require('../models/propertyStatus')
const RentStatus = require('../models/rentStatus')
const SaleStatus = require('../models/saleStatus')

const getPropertyStatus = async (req, res) => {
  try {
    const status = await PropertyStatus.findAll();
    res.status(200).json(status);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getRentStatus = async (req, res) => {
  try {
    const status = await RentStatus.findAll();
    res.status(200).json(status);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getSaleStatus = async (req, res) => {
  try {
    const status = await SaleStatus.findAll();
    res.status(200).json(status);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

module.exports = { getPropertyStatus, getRentStatus, getSaleStatus };
