const signUp = require('../controller/user_auth/signUp.js')
const signIn = require('../controller/user_auth/signIn.js')
const googleAuth = require('../controller/user_auth/googleAuth.js')
const express = require('express')
const authRoutes = express.Router()

authRoutes.post('/sign-up', signUp)
authRoutes.post('/sign-in', signIn)
authRoutes.post('/google-auth', googleAuth)

module.exports = authRoutes
