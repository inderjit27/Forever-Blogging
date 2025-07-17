import React from 'react'
import axios from 'axios';

const ImgUploadCloudinary = async (img) => {

    try {
        let ImgResp = {};

        const formData = new FormData();
        formData.append('img', img);

        const resp = await axios.post(`${import.meta.env.VITE_BackendURL}/cloudinary/file-upload`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        
        if(resp.data.Success == true){
            ImgResp = resp.data

            return ImgResp
        }


    } catch (error) {
        console.log(error)
    }

}

export default ImgUploadCloudinary