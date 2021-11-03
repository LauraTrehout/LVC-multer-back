const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connection = require('./db-config')
const { setupRoutes } = require('./routes')
const multer = require('multer')

const app = express()

const port = process.env.PORT

connection.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack)
    } else {
      console.log('connected to database with threadId :  ' + connection.threadId)
    }
  })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
})

const upload = multer({storage:storage})

//-------------------------------Use single OR multiple route------------------

// Single

app.post('/upload', upload.single('single_image'), (req, res) => {
    res.send('uploaded')
})

//Multiple 

app.post(
    '/upload',
    upload.fields([
      { name: 'image_1' },
      { name: 'image_2' },
      { name: 'image_3' }
    ]),
    (req, res) => {
      res.status(200).json('Uploaded')
    }
  )
  //--------------------------------------------------------------------------------------------------------

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))

setupRoutes(app)

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })