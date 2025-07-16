const { getAuth } = require("firebase-admin/auth")
const user = require('../../models/userModel')
const SetUniqueUserName = require('../../functions/SetUniqueUserName')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jsonwebtoken = require('jsonwebtoken')


const FormatData = (user) => {

    const user_token = jsonwebtoken.sign({ id: user._id }, process.env.SCREAT)

    return ({
        token: user_token,
        userName: user.personal_information.userName,
        fullName: user.personal_information.fullName,
        email: user.personal_information.email,
        profileImg: user.personal_information.profileImg,
    })
}



const googleAuth = async (req, res) => {

    let { access_token } = req.body

    getAuth()
        .verifyIdToken(access_token)
        .then(async (hashUser) => {
            let { email, name, picture } = hashUser

            picture = picture.replace("s96-c", "s384-c")

            // CheckUser is present or not 
            let userInfo = await user.findOne({ "personal_information.email": email }).select("personal_information.fullName personal_information.userName personal_information.profileImg google_auth")
                .then((userData) => {
                    return userData || null
                })
                .catch((err) => {
                    console.log(err)
                    return res.json({ Success: false, Message: 'Somthig Went Wrong.' })
                })

            if (userInfo) {
                // Login
                if (!userInfo.google_auth) {
                    return res.json({ Success: false, Message: 'This Email was signed up without google. please login with another method like Password to access this Account. ' })
                }
            }
            else {
                // SignUp
                const username = await SetUniqueUserName(email)

                userInfo = new user({
                    personal_information: {
                        fullName: name,
                        email: email,
                        profileImg: picture,
                        userName: username
                    },

                    google_auth: true
                })

                await userInfo.save().then((T) => {
                    userInfo = T
                })
                    .catch((err) => {
                        console.log(err)
                        return res.json({ Success: false, Message: 'Wrong Somthing' })
                    })

            }

            return res.json({Success:true, Message:'Successfully Authenticate', Data:FormatData(userInfo)})


        })
        .catch((err)=>{
            console.log(err)
            return res.json({ Success: false, Message: 'Fail to authentication uou with google' })
        })

}

module.exports = googleAuth