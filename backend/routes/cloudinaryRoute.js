const cloudinaryUpload = require('../controller/cloudinary/cloudinaryUpload.js')
const express = require('express')
const cloudinaryRoute = express.Router()

cloudinaryRoute.post('/file-upload', cloudinaryUpload)

module.exports = cloudinaryRoute