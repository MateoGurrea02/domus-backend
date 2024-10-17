const express = require('express');
const { createUser, getUsers, getUserById, login, verifyToken } = require('../controllers/userController');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin')

router.post('/register', createUser);
router.post('/login', login)
router.get('/users', isAdmin, getUsers);
router.get('/users/:id', isAdmin, getUserById);
router.get('/verifyToken', verifyToken)

module.exports = router;
