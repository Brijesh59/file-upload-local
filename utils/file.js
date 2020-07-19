
const multer = require('multer')
const fs = require('fs')

const uploadFile = (req, res = {}) => {
  
  const uploadObj = {
    error: null,
    filePath: ''
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, req.params.fileName || file.originalname)
    }
  })
    
  const upload = multer({
    // dest: 'uploads/', 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10, files: 1 }
  }).single('files')

  return new Promise((resolve, reject) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        uploadObj.error = err.message
        resolve(uploadObj)
      } 
      else if (err) {
        uploadObj.error = err.message
        resolve(uploadObj)
      }
      else if(!req.file){
        uploadObj.error = 'no file found'
        resolve(uploadObj)
      }
      else{
        uploadObj.filePath = req.file.path
        resolve(uploadObj)
      } 
    })
  })
  
}

const deleteFile = (fileName) => {
  return new Promise((resovle, reject)=>{
    try{
      fs.unlinkSync(`uploads/${fileName}`)
      resovle({error: null, message: 'file deleted successfully'})
    }
    catch(error){
      resovle({error: error.message, message: 'failed to delete file'})
    } 
  })
}

module.exports = {
  uploadFile,
  deleteFile
}