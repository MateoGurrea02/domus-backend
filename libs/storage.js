const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media/img')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname
        const dot = fileName.lastIndexOf('.')
        const extention = fileName.slice(dot)
      cb(null, `${Date.now()}${extention}`)
    }
  })
  
const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 },   // Handle file upload for 'image'
  { name: 'id', maxCount: 1 }       // Handle 'id' field as a form-data field
])

module.exports = upload