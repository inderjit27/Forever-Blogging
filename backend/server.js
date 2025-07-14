const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnection.js')
require('dotenv').config()
const authRoutes = require('./routes/authRoute.js')
const cors = require('cors')


const PORT = process.env.PORT

const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin (adjust as needed)
  credentials: true, // allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // headers allowed
};

// Apply CORS middleware
app.use(cors(corsOptions));


app.use(express.json())

app.use('/auth',authRoutes)



app.get('/',(req,res)=>{
    return res.send('🙏 Welcome To Forever Blogging Website')
})

app.listen(PORT,()=>{
    console.log(`✅ Server Start on ${PORT} PORT No`)
})



dbConnection()
