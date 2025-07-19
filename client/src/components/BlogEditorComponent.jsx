
import { Link } from 'react-router-dom'
import Logo from '../data/logo.svg'
import { GoPlus } from "react-icons/go";
import ImgUploadCloudinary from '../functions/ImgUploadCloudinary';
import { toast } from 'react-toastify';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../AppContext';
import EditorJS from '@editorjs/editorjs';
import { tools } from './WriteTools';


const BlogEditorComponent = () => {

  const { blogInfo, SetBlogInfo, TextEditorBlog, SetTextEditorBlog, EditorStatusChange, SetEditorStatusChange } = useContext(AppContext)

  // # FUNCTION -------------------------------------------------

  const TiteKeyDownHandel = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault()
    }
  }

  const BlogTitleHandel = (e) => {
    let input = e.target

    input.style.height = 'auto'
    input.style.height = input.scrollHeight + 'px'

    SetBlogInfo(prev => ({
      ...prev,
      blogData: {
        ...prev.blogData,
        title: input.value,
      }

    }));

  }


  const HandelBannerUpload = async (e) => {
    let img = e.target.files[0]

    if (img) {
      const imgUploading = toast.loading('Image Uploading...')
      const resp = await ImgUploadCloudinary(img)

      e.target.value = null; // 

      if (resp.Success == true) {
        toast.dismiss(imgUploading)

        SetBlogInfo(prev => ({
          ...prev,
          blogData: {
            ...prev.blogData,
            bannerURL: resp.Data.URL,
            bannerImgId: resp.Data.Cloud_Image_id
          }

        }));

        toast.success('Image Uploaded Successfully !')
      }
      else {
        toast.dismiss(imgUploading)
        toast.error('❌ Somthing Went Wrong.')
      }
    }


  }


  const PublishBTNhandel = () => {

    if (!blogInfo.blogData.bannerURL.length) {
      return toast.error('Please Upload Banner Image.')
    }

    if (!blogInfo.blogData.title.length) {
      return toast.error('Please Write Title.')
    }

    if (TextEditorBlog.isReady) {

      TextEditorBlog.save().then((data) => {
        if (data.blocks.length) {
          SetBlogInfo(pre => ({
            ...pre,
            blogData: {
              ...pre.blogData,
              content: data
            }
          }))

          SetEditorStatusChange('publish')
        }
        else {
          return toast.error('Please Write in 1 thing in coustom write.')
        }
      })
        .catch((err) => {
          console.log(err)
        })

    }
    else {
      return toast.error('Somthing Went Wrong, Please wait few seconds, try Again')
    }

  }


  // ----------------------------------------------------------

  useEffect(() => {
    SetTextEditorBlog(new EditorJS({
      holderId: "BlogUserContainer",
      data: '',
      tools: tools,
      placeholder: 'Select & Write Somthing Here !'
    }))
  }, [])


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
        <div className='w-fit h-[40px] px-[10px] pr-[15px] ml-[20px] rounded-[4px] flex justify-center items-center select-none cursor-pointer  max-md:hidden'>
          <p className='TrapM tracking-tight mt-[2px]'>

            {
              blogInfo.blogData.title == '' ?
                <>
                  New Blog
                </>

                :

                blogInfo.blogData.title.length > 27
                  ? blogInfo.blogData.title.slice(0, 27) + '...'
                  : blogInfo.blogData.title

            }

          </p>
        </div>





        {/* Publish & Save Draft BTN -------------------------------------------------------------------------- */}
        <div className='w-fit h-[40px] flex justify-center items-center gap-[7px] ml-auto'>

          {/* Publish BTN */}
          <div onClick={PublishBTNhandel} className='w-fit h-full px-[12px] flex justify-center items-center select-none cursor-pointer rounded-full
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

      {/* ////////////////////// [ Write Blog Pannel ] ////////////////////////// */}

      <div className='w-full max-w-[900px] h-fit m-auto pt-[20px] px-[20px]'>


        {/* Banner Image Pannel */}
        <div className='w-full h-fit flex flex-col mt-[10px]'>

          {/* Title Pannel */}
          <h1 className='TrapSB text-[22px] leading-[22px] text-[#333333] tracking-tight select-none'>Banner Image </h1>
          <span className='TrapSB tracking-tight text-[12px] text-[#9e6a26] mb-[7px] select-none'>(Format Support only .WebP)</span>

          {/* Banner Image Container */}
          <div className=' relative aspect-video bg-[#f0f0f0] border-[4px] border-gray-400  '>
            <label htmlFor="uploadBanner">
              {/* Default Image & Set Upload Image */}
              {
                blogInfo.blogData.bannerURL == '' ?
                  (
                    <>
                      <img src='' alt="" className='z-[2] w-full h-full object-cover' id='' />
                    </>
                  ) :
                  (
                    <>
                      <img src={blogInfo.blogData.bannerURL} alt="" className='z-[2] w-full h-full object-cover' id={blogInfo.blogData.bannerImgId} />
                    </>
                  )

              }

              {/* Banner Input Folder */}
              <input className='w-full  z-[10] cursor-pointer opacity-0' type="file"
                accept='.WebP'
                id='uploadBanner'
                onChange={HandelBannerUpload}
              />
            </label>
          </div>

        </div>

        {/* Blog Title */}
        <textarea className='w-full  mt-[20px] TrapM text-[1.4rem] outline-none resize-none leading-tight tracking-tight p-[7px] text-[#313131]'
          placeholder='Blog Title '
          onKeyDown={TiteKeyDownHandel}
          onChange={BlogTitleHandel}
        ></textarea>

        <hr className='w-full h-[1px] opacity-10 px-[20px]' />

        {/* Custom Div For Blog */}
        <div id='BlogUserContainer' className='TrapM mt-[20px]'></div>


      </div>

    </>
  )
}

export default BlogEditorComponent