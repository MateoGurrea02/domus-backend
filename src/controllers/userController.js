const User = require('../models/user');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
  try {
    let { name, email, password, type } = req.body;
    
    password = await bcrypt.hash(password, 10)
    console.log(password)
    const user = await User.create({ name, email, password, type });
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo el usuario' });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findAll({
      where: {
        email: email
      }
    })
    const hashPassword = user[0].password
    bcrypt.compare(password, hashPassword).then(res => {
      console.log(res)
    })
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({'hola': 'xd'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo el usuario' });
  }
}

module.exports = { createUser, getUsers, getUserById, login };
