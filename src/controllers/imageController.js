const ImageProperty = require('../models/imageProperty')
const Property = require('../models/property')
const upload = require('../../libs/storage')

const uploadImage = async (req, res) => {
    try {
        const property = req.body.property
        const path = req.file.filename
        const imageProperty = await ImageProperty.create({ property, path })
        res.status(201).json({ message:'Imagen cargada exitosamente', image: imageProperty});
    } catch (error) {
        console.error(error); // Imprime el error en la consola
        res.status(500).json({ error: error });
    }
};



module.exports = { uploadImage }