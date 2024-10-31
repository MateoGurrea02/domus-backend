const path = require('path');
const fs = require('fs');
const ImageProperty = require('../models/imageProperty')

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

const getPropertyImages = async (req, res) => {
    try{
        // Conseguimos todas las imagenes asociadas a una propiedad
        const property = req.params.property
        const imageProperty = await ImageProperty.findAll({
            where:{property: property} 
        })
        
        // Creamos un listado de los nombres de las imagenes
        const pathList = imageProperty.map((image)=>(image.path))

        // Conseguimos el path de las imagenes
        const imagePath = path.join(__dirname, '../../media/img');

        fs.readdir(imagePath, (err, files) => {
            if (err) {
              return res.status(500).json({ message: 'No se pudo escanear el directorio de imagenes', error: err });
            }

            // Filtramos al directorio de imagenes para conseguir solo las imagenes de nuestra propiedad
            const imageFiles = files.filter(file => pathList.includes(file));

            // Generamos la ruta a cada imagen
            const imageUrls = imageFiles.map(file => `${req.protocol}://${req.get('host')}/media/img/${file}`);
            
            res.status(200).json({ images: imageUrls });
         });
    } catch (error){
        return res.status(500).json({ message: 'Error al conseguir las imagenes', error: err })
    }
}


module.exports = { uploadImage, getPropertyImages }