const Agent = require('../models/agent')
const User = require('../models/user')
const UserType = require('../models/userType')

const createAgent = async (req, res) => {
  try {
    const { user } = req.body;
    const agent = await Agent.create({ user });
    const userModel = await User.findByPk(id=user)
    userModel.set({
      type: 2
    })
    await userModel.save()
    res.status(201).json(agent);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error creando al agente' });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.findAll({
      attributes: ['id', 'createdAt', 'updatedAt'],
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

const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findByPk(id,
      {
        attributes: ['id', 'createdAt', 'updatedAt'],
        include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        }
      ]
      }
    );

    if (!agent) {
      return res.status(404).json({ error: 'Agente no encontrado' });
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo al agente' });
  }
};

const deleteAgent = async (req, res) => {
  try{
    const { id } = req.params;
    const agent = await Agent.findByPk(id)
    await agent.destroy()
    return res.status(200).json({ mensaje: 'Agente borrado' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo al agente' });
  }
}

module.exports = { createAgent, getAgents, getAgentById, deleteAgent };
