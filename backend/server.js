const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnection.js')
require('dotenv').config()
const authRoutes = require('./routes/authRoute.js')
const cors = require('cors')
const admin = require("firebase-admin")
const firebaseServer = require('./firebaseServer.json') 


const PORT = process.env.PORT

admin.initializeApp({
  credential: admin.credential.cert(firebaseServer)
});


const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin (adjust as needed)
  credentials: true, // allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // headers allowed
};

// Apply CORS middleware
app.use(cors(corsOptions));

// ✅ FIX: Add this middleware to set relaxed COOP header
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  next();
});

app.use(express.json())

app.use('/auth',authRoutes)



app.get('/',(req,res)=>{
    return res.send('🙏 Welcome To Forever Blogging Website')
})

app.listen(PORT,()=>{
    console.log(`✅ Server Start on ${PORT} PORT No`)
})



dbConnection()
