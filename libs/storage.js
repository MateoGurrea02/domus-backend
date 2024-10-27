const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media/img')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname
        const dot = fileName.lastIndexOf('.')
        const extention = fileName.slice(dot)
      cb(null, `${file.fieldname}${Date.now()}${extention}`)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload