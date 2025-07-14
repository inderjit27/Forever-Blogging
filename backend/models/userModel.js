const mongoose = require('mongoose')
const { Schema } = mongoose;

const userModel = new mongoose.Schema({

    personal_information:{
        fullName: { type:String, lowerCase: true, required:true},
        email: {type:String, require:true, lowerCase:true, unique:true},
        password: {type:String, require:true},
        userName: {type:String, unique:true},
        bio: {type: String, default:""},
        profileImg: {type:String, default:""}
    },

    social_links:{
        youtube: {type:String, default:""},
        instagram: {type:String, default:""},
        facebook: {type:String, default:""},
        website:{type:String, default:""},
        github: {type:String, default:""},
        twitter: {type:String, default:""},
    },

    account_info:{
        totalPosts:{type:Number, default:0},
        totalReads:{type:Number, default:0},
    },

    google_auth:{type:Boolean, default:false},

    blogs:[{type: Schema.Types.ObjectId, ref:'blog', default:[]}]

},
{
    timestamps:{ createdAt:'joinedAt'}
}
)


module.exports = mongoose.model("user", userModel)