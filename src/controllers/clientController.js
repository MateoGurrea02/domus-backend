const Client = require('../models/client')
const User = require('../models/user')

const createClient = async (req, res) => {
  try {
    const { dni, phoneNumber, user } = req.body;
    const client = await Client.create({ dni, phoneNumber, user });
    const userModel = await User.findByPk(id=user)
    userModel.set({
      type: 3
    })
    await userModel.save()
    res.status(201).json(client);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error creando al cliente' });
  }
};

const getClients = async (req, res) => {
  try {
    const agents = await Client.findAll({
      attributes: ['id', 'dni', 'phoneNumber', 'createdAt', 'updatedAt'],
      include: [
      {
        model: User,
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
      }
    ]
    });
    res.status(200).json(agents);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id,
      {
        attributes: ['id', 'dni', 'phoneNumber', 'createdAt', 'updatedAt'],
        include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        }
      ]
      }
    );

    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo al cliente' });
  }
};

module.exports = { createClient, getClients, getClientById };
