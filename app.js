const express = require('express')
const { uploadFile, deleteFile } = require('./utils/file')

const app = express()
app.use('/uploads', express.static('uploads'))

app.post('/uploads/:fileName?', async (req, res) => {
  const { error, filePath } = await uploadFile(req)
  if(error) return res.status(400).json({status: 'fail', message: error})
  res.status(200).json({status: 'success', message: filePath})
})

app.delete('/uploads/:fileName', async(req, res) => {
  const { error, message } = await deleteFile(req.params.fileName)
  if(error) return res.json({status: 'fail', message: error})
  res.json({status: 'success', message})
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Server started at: ' + PORT))
