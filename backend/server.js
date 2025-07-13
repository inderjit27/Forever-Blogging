const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnection.js')
require('dotenv').config()
const authRoutes = require('./routes/authRoute.js')


const PORT = process.env.PORT

app.use(express.json())

app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    return res.send('🙏 Welcome To Forever Blogging Website')
})

app.listen(PORT,()=>{
    console.log(`✅ Server Start on ${PORT} PORT No`)
})



dbConnection()
