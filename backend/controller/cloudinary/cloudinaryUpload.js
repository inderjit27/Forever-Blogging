const MAX_SIZE = 200 * 1024;
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

const cloudinaryUpload = async(req,res) =>{
    
    try {

        const imgFile = req.files?.img; 

        if (!imgFile) {
            return res.json({
                Success: false,
                Message: 'No Image Uploaded, Please Upload Image',
            });
        }

        if (imgFile.size >= MAX_SIZE) {
            return res.status(400).json({
                Success: false,
                Message: 'Image size must be under 200KB',
            });
        }

        const cloudinaryResponce = await cloudinary.uploader.upload(imgFile.tempFilePath,{folder: process.env.FOLDER})

        return res.json({Success:true, Message:'Upload Successfully 👍', Data:{ URL:cloudinaryResponce.secure_url, Cloud_Image_id:cloudinaryResponce.public_id }})


    } catch (error) {
        console.log(error)
    }
}

module.exports = cloudinaryUpload