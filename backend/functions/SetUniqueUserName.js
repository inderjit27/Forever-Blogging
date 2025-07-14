const {nanoid} = require('nanoid')
const user = require('../models/userModel.js')

const userNameCheckerUnique = async (username) => {

    let newUsername = username;
    let isTaken = await user.exists({ 'personal_information.userName': newUsername });

    // Keep generating new usernames until a unique one is found
    while (isTaken) {
        newUsername = `${username}${nanoid(4)}`; // Append 4-character nanoid
        isTaken = await user.exists({ 'personal_information.userName': newUsername });
    }

    return newUsername;
}


const SetUniqueUserName = async (email) => {
    let username = email.split("@")[0];
    const uniqueUserName = await userNameCheckerUnique(username)
    return uniqueUserName
}


module.exports = SetUniqueUserName