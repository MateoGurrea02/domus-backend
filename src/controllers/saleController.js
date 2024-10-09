const Sale = require('../models/sale')

const createSale = async (req, res) => {
  try {
    const { property, client, date, amount, status } = req.body;
    const sale = await Sale.create({ property, client, date, amount, status });
    res.status(201).json(sale);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id);

    if (!sale) {
      return res.status(404).json({ error: 'Alquiler no encontrado' });
    }

    res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo al alquiler' });
  }
};

module.exports = { createSale, getSales, getSaleById };
