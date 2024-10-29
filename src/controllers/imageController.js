const imageProperty = require('../models/imageProperty')
const Property = require('../models/property')
const upload = require('../../libs/storage')

const uploadImage = async (req, res) => {
    try {
      res.status(201).json({ message:'Imagen cargada exitosamente'});
    } catch (error) {
      console.error(error); // Imprime el error en la consola
      res.status(500).json({ error: error });
    }
  };

module.exports = { uploadImage }