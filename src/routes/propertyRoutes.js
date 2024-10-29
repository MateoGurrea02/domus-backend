const path = require('path');
const express = require('express');
const { createProperty, getProperties, getPropertyById, getPropertiesByAgent, deleteProperty, filterProperty, updateProperty } = require('../controllers/propertyController');
const { uploadImage } = require('../controllers/imageController')
const router = express.Router();
const { isAgent } = require('../middlewares/isAgent')
const upload = require('../../libs/storage')

router.post('/properties', isAgent, createProperty);
// Para usar el filter deberemos pasar todos los atributos que necesitemos filtrar por el body, recomendado solo filtrar por precio, tipo de propiedad, tamaño y tamaño.
// Si necesitamos pasar algun atributo para buscar un rango necesitamos pasar el atributo como un json y usaremos gte para buscar en rangos mas grandes y lte para mas chicos.
router.post('/properties/filter', filterProperty)
router.get('/properties', getProperties);
router.get('/properties/find/:id', getPropertyById);
router.get('/properties/agent/', isAgent, getPropertiesByAgent);
router.put('/properties/update/:id', isAgent, updateProperty)
router.delete('/properties/:propertyId', isAgent, deleteProperty);
router.post('/image', upload, uploadImage)
router.get('/image', (req, res) => {
    const imagePath = path.join(__dirname, '../../media/img/image1730066757244.png');
    res.sendFile(imagePath)
})

module.exports = router;
