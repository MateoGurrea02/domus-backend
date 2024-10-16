const Agent = require('../models/agent')
const { auth } = require('../authenticators/auth')

const createAgent = async (req, res) => {
  try {
    const { user } = req.body;
    const agent = await Agent.create({ user });
    res.status(201).json(agent);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error creando al agente' });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.findAll();
    res.status(200).json(agents);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findByPk(id);

    if (!agent) {
      return res.status(404).json({ error: 'Agente no encontrado' });
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo al agente' });
  }
};

module.exports = { createAgent, getAgents, getAgentById };
