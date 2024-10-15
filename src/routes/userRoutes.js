const express = require('express');
const { createUser, getUsers, getUserById, login } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/login', login)

module.exports = router;
