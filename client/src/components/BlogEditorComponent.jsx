
import { Link } from 'react-router-dom'
import Logo from '../data/logo.svg'
import { GoPlus } from "react-icons/go";
import ImgUploadCloudinary from '../functions/ImgUploadCloudinary';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';

const BlogEditorComponent = () => {

  const BannerImage = useRef()

  // # FUNCTION -------------------------------------------------
  

  // ----------------------------------------------------------

  const HandelBannerUpload = async (e) =>{
    let img = e.target.files[0]

    if(img){
      const imgUploading = toast.loading('Image Uploading...')
      const resp = await ImgUploadCloudinary(img)

      e.target.value = null; // 

      if(resp.Success == true){
        toast.dismiss(imgUploading)
        BannerImage.current.src = resp.Data.URL
        BannerImage.current.id = resp.Data.Cloud_Image_id
        toast.success('Image Uploaded Successfully !')
      }
      else{
        toast.dismiss(imgUploading)
        toast.error('❌ Somthing Went Wrong.')
      }
    }


  }

  return (
    <>

      {/* NavBar */}
      <div className="w-full h-fit flex  relative
            max-md:px-[1rem] max-md:py-[0.7rem] border-b-[1px] border-[#bbbbbb] md:px-[2rem] md:py-[1rem]">



        {/* Logo-Container -------------------------------------------------------------------------- */}
        <Link to='/'>
          <div className="w-[35px] h-[40px] flex justify-center items-center cursor-pointer select-none">
            <img src={Logo} className='w-full ' />
          </div>
        </Link>





        {/* New Blog Container -------------------------------------------------------------------------- */}
        <div className='w-fit h-[40px] px-[10px] pr-[15px] ml-[20px] rounded-[4px] flex justify-center items-center select-none cursor-pointer  bg-[#f0f0f0] text-[#272727] hover:bg-[#272727] hover:text-[#f0f0f0] max-md:hidden'>
          <GoPlus className='text-[18px]' />
          <p className='TrapM tracking-tight mt-[2px]'>New Blog</p>
        </div>





        {/* Publish & Save Draft BTN -------------------------------------------------------------------------- */}
        <div className='w-fit h-[40px] flex justify-center items-center gap-[7px] ml-auto'>

          {/* Publish BTN */}
          <div className='w-fit h-full px-[12px] flex justify-center items-center select-none cursor-pointer rounded-full
          bg-[#272727] text-[#f0f0f0]
          '>
            <p className='TrapM tracking-tight mt-[2px] text-[15px]'>Publish</p>
          </div>

          {/* Save Draft BTN */}
          <div className='w-fit h-full px-[12px] flex justify-center items-center select-none cursor-pointer rounded-full
          bg-[#f0f0f0] text-[#272727]
          '>
            <p className='TrapM tracking-tight mt-[2px] text-[15px]'>Save</p>
          </div>


        </div>

      </div>

      {/* ///////////////////////////////////// [ Write Blog Pannel ] ///////////////////////////////////////////////// */}

      <div className='w-full max-w-[900px] h-fit  m-auto pt-[20px] px-[20px]'>


        {/* Banner Image Pannel */}
        <div className='w-full h-fit flex flex-col mt-[10px]'>

          {/* Title Pannel */}
          <h1 className='TrapSB text-[22px] leading-[22px] text-[#333333] tracking-tight select-none'>Banner Image </h1>
          <span className='TrapSB tracking-tight text-[12px] text-[#9e6a26] mb-[7px] select-none'>(Format Support only .WebP)</span>

          {/* Banner Image Container */}
          <div className=' relative aspect-video bg-[#f0f0f0] border-[4px] border-gray-400 '>
            <label htmlFor="uploadBanner">
              {/* Default Image & Set Upload Image */}
              <img ref={BannerImage} src='' alt="" className='z-[2] w-full h-full object-cover' id='' />

              {/* Banner Input Folder */}
              <input className='w-full h-full z-[10] cursor-pointer opacity-0' type="file"
                accept='.WebP'
                id='uploadBanner'
                onChange={HandelBannerUpload}
              />
            </label>
          </div>

        </div>



      </div>

    </>
  )
}

export default BlogEditorComponent