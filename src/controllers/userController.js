const User = require('../models/user');
const UserType = require('../models/userType')

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const secretKey = 'secret'

const createUser = async (req, res) => {
  try {
    let { name, email, password, type } = req.body;
    
    password = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password, type });
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'],
      include: [{
        model: UserType,
        attributes: ['id', 'type'],
      }]
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'],
      include: [{
        model: UserType,
        attributes: ['id', 'type'],
      }]
    });

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

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const hashPassword = user[0].password

    bcrypt.compare(password, hashPassword).then(response => {
      if (response){
        const id = user[0].id
        const type = user[0].type
        const name = user[0].name
        
        const token = jwt.sign({ id, email, type, name }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({ token });
    }})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo el usuario' });
  }
}

const verifyToken = async (req, res) => {
  const header = req.header("authorization") || "";
  const token = header.split(" ")[0]

  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const id = payload.id
    const email = payload.email;
    const type = payload.type
    const name = payload.name

    return res.status(200).json({ id:id, email: email, type: type, name: name })
  } catch (error) {
    return res.status(403).json({ message: "Token not valid", error:error });
  }
}

module.exports = { createUser, getUsers, getUserById, login, verifyToken };
