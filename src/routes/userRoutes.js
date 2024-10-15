const express = require('express');
const { createUser, getUsers, getUserById, login, verifyToken } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/login', login)
router.post('/verifyToken', verifyToken)

module.exports = router;
