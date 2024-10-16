const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secretKey = 'secret'

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

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const hashPassword = user[0].password

    bcrypt.compare(password, hashPassword).then(response => {
      if (response){
        const type = user[0].type
        const name = user[0].name

        const token = jwt.sign({ email, type, name }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({ token });
    }})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo el usuario' });
  }
}

const verifyToken = async (req, res) => {
  const header = req.header("token") || "";
  const token = header.split(" ")[0]

  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    const email = payload.email;
    const type = payload.type
    const name = payload.name

    return res.status(200).json({ email: email, type: type, name: name })
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

module.exports = { createUser, getUsers, getUserById, login, verifyToken };
