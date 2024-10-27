const express = require('express');
const { createUser, getUsers, getUserById, login, verifyToken } = require('../controllers/userController');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin')
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')

router.post('/register', createUser);
router.post('/login', login)
router.get('/users', isAdminOrAgent, getUsers);
router.get('/users/:id', isAdminOrAgent, getUserById);
router.get('/verifyToken', verifyToken)

module.exports = router;
