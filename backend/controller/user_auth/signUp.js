const user = require('../../models/userModel.js')

const signUp = async(req,res) =>{
    try {
        
    } catch (error) {
        console.log('SignUp Unsuccessful :-> ' + error )
        return res.json({Success:false, Message:'Somthing Went Wrong'})
    }
}

module.exports = signUp