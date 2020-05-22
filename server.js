const express = require('express')
require('dotenv').config()
const socketio = require('socket.io')
const http = require('http')
const connectDB = require('./config/db')

const auth = require('./middleware/auth')

const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

const db = process.env.MONGODB_URI


const app = express()
connectDB()


//app.use(multer().single('file'))
app.use(express.json({ extended: false }))




//multer and gridfs and rest

// Create Mongo connection
const conn = mongoose.connection
// Initialize gfs
let gfs

// Initialize gfs stream
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})

//create storage engine
const storage = new GridFsStorage({
  url: db,
  options: {useUnifiedTopology: true},
  file: (req, file) => {
      console.log(file)
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: {
              user: req.user.id
          }
        }
        resolve(fileInfo)
        console.log(fileInfo)
      })
    })
  }
})

const upload = multer({ storage })







//socket 
const server = http.createServer(app)
const io = socketio(server) 

/*//const conn = mongoose.connection
mongoose.connect(db, { useNewUrlParser: true })
  .then(
    () => console.log("!!!"),
    err => console.error.bind(console, "database connection error:")
  )*/


io.on('connection', (socket)=>{
    //console.log('We have a new connection!!!')

    //send to everybody from server
    //io.emit('svima', {text: 'pozdrav svima'})

    //sent from frontend
    //socket.on('join', ({name})=>{
    //    console.log(name)})

    //sent form front to evry other front
    socket.on('sendChatMessage', ({name, text})=>{
        socket.broadcast.emit('chatMessage', {name, text} )
    })

    //socket.on('disconnect', () => {
    //    console.log('user left!!!')
    //})
})



app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/profile', require('./routes/profile'))
app.use('/posts', require('./routes/posts'))
//app.use('/image', require('./routes/image'))


// bez expres rutera
app.post('/image', [ auth, [upload.single('file')]], (req, res) => {
    //console.log(req)
    //res.json( req.file)
})
app.get('/image', auth, (req, res)=> {
  gfs.files.find({"metadata.user": req.user.id}).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    const readstream = gfs.createReadStream(files)
      readstream.pipe(res)
  })
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000

server.listen(PORT, ()=> console.log(`SERVER STARTED ON PORT ${PORT}`))



/*
io.on('connection', (socket)=>{
    console.log('We have a new connection!!!')

    //send to everybody from server
    io.emit('svima', {text: 'pozdrav svima'})

    //sent from frontend
    socket.on('join', ({name})=>{
        console.log(name)
    })

    //sent form front to evry other front
    socket.on('sendChatMessage', ({name})=>{
        socket.broadcast.emit('chatMessage', {name} )
    })

    socket.on('disconnect', () => {
        console.log('user left!!!')
    })
})
*/

