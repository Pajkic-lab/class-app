/*const express = require('express')
const router = express.Router()

const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

const config = require('config')
const db = config.get('mongoURI')

const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')


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
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})

const upload = multer({ storage })

//upload image
router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.json( req.file)
})


module.exports = router

 */