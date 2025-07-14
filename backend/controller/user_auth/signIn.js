const user = require('../../models/userModel.js')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jsonwebtoken = require('jsonwebtoken')

const signIn = async(req,res) =>{

    const FormatData = (user) => {
    
        const user_token = jsonwebtoken.sign({id: user._id}, process.env.SCREAT)
    
        return ({
            token: user_token,
            userName: user.personal_information.userName,
            fullName: user.personal_information.fullName,
            email: user.personal_information.email,
            profileImg: user.personal_information.profileImg,
        })
    }


    try {

        const {email, password} = req.body

        if(!email || !password){
            return res.json({Success:false, Message:'Fill All Form Carefully.'})
        }

        const checkUser = await user.findOne({"personal_information.email": email})
        if(!checkUser){
            return res.json({Success:false, Message:'Email is not exist.'})
        }

        const checkPassword = await bcrypt.compare(password, checkUser.personal_information.password)
        if(!checkPassword){
            return res.json({Success:false, Message:'Wrong Password.'})
        }

        return res.json({Success:true, Message:'Login Successfully !', Data:FormatData(checkUser)})

    } catch (error) {
        console.log('SignIn Unsuccessfull :-> ' + error)
        return res.json({ Success: false, Message: 'Somthing Went Wrong' })
    }
}


module.exports = signIn