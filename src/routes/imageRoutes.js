const express = require('express');
const { uploadImage, getPropertyImages } = require('../controllers/imageController')
const router = express.Router();
const { isAdminOrAgent } = require('../middlewares/isAdminOrAgent')
const upload = require('../../libs/storage')

router.post('/image', isAdminOrAgent, upload.single('image'), uploadImage)
router.get('/image/:property', getPropertyImages)

module.exports = router;
