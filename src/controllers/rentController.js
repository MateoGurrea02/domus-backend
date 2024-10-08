const Rent = require('../models/rent')

const createRent = async (req, res) => {
  try {
    const { property, client, startDate, finishDate, monthlyAmount, status } = req.body;
    const rent = await Rent.create({ property, client, startDate, finishDate, monthlyAmount, status });
    res.status(201).json(rent);
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

module.exports = { createRent, getRents, getRentById };
