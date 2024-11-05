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

const updateClient = async (req, res) => {
  try {
    const { id, dni, phoneNumber, name, email } = req.body;
    const client = await Client.findByPk(id)

    client.set({
      dni: dni,
      phoneNumber: phoneNumber,
    })

    await client.save()
    
    const user = await User.findByPk(client.user)

    user.set({
      name: name,
      email: email,
    })

    await user.save()

    res.status(200).json({client: client, user:user});
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
}

const deleteClient = async (req, res) =>{
  try {
    const id = req.params.id
    const client = await Client.findByPk(id)
    await client.destroy()
    const userModel = await User.findByPk(id=id)
    userModel.set({
      type: 4
    })
    await userModel.save()

    res.status(200).json({ message: 'Cliente borrado exitosamente' })
  } catch(error){
    console.error(error)
    res.status(500).json({ error: error })
  }
}

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };
