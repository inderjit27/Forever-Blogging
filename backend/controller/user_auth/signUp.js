const user = require('../../models/userModel.js')
let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const bcrypt = require('bcrypt')
const SetUniqueUserName = require('../../functions/SetUniqueUserName.js')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()


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


const signUp = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ Success: false, Message: 'Fill all form Carefully.' })
        }

        // check Email is corect or not
        if (!emailChecker.test(email)) {
            return res.json({ Success: false, Message: 'Invalid Email.' })
        }

        // check Password must be secure
        if (!passwordChecker.test(password)) {
            return res.json({ Success: false, Message: 'Password must be 6 to 20 characters. Along with Numeric Number, 1 Lowercase & 1 Uppercase Letter.' })
        }

        // Hash Password 
        const hashPassword = await bcrypt.hash(password, 10)

        // Set always unique username
        const userName = await SetUniqueUserName(email)

        // Store Data in DataBase
        const userDB = new user({
            personal_information: {
                fullName: name,
                email: email,
                password: hashPassword,
                userName: userName,
            }
        })

        userDB.save()
        .then((user) => {
            return res.json({Success: true, Message:'SignUp Successfully !', Data: FormatData(user)})
        })
        .catch((error) => {

            if (error.code == 11000) {
                return res.json({ Success: false, Message: 'Email is all-ready exist.' })
            }

            return res.json({ Success: false, Message: 'Error Occured :-> ' + error })
        })



    } catch (error) {

        console.log('SignUp Unsuccessfull :-> ' + error)
        return res.json({ Success: false, Message: 'Somthing Went Wrong' })
    }
}

module.exports = signUp