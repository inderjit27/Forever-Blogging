const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('✅ DataBase Connection Done Successfully!'))
        .catch((error) => console.log('❌ DataBase Connection Unsuccessful :-> ' + error ))
}

module.exports = dbConnection