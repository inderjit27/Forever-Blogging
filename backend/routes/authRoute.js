const signUp = require('../controller/user_auth/signUp.js')
const express = require('express')
const authRoutes = express.Router()

authRoutes('/sign-up', signUp)



module.exports = authRoutes
