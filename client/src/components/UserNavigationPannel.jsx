import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { Link } from 'react-router-dom'
import { LuFilePenLine } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { CgEreader } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";
import {removeItemFromSession} from "../functions/Session"

const UserNavigationPannel = () => {

    const { userAuthentication, SetUserAuthentication } = useContext(AppContext)

    const SignOutHandler = () => {
        removeItemFromSession('user')
        SetUserAuthentication({token:null})
    }

    return (
        <>

            <div className='absolute bg-regular-white w-[200px] top-[100%] mt-[1rem] right-0 h-fit p-[4px] overflow-hidden select-none cursor-pointer flex flex-col justify-center items-center gap-[4px]'>

                {/* Write */}
                <Link to='/editor' className='w-full'>
                    <div className='w-full h-[35px] text-[#272727] flex bg-[#dfdfdf] hover:bg-[#272727] hover:text-[#efefef]  justify-center items-center px-[0.7rem] gap-[7px] ml-auto rounded-[4px] select-none cursor-pointer md:hidden'>
                        <LuFilePenLine className='TrapM text-[1rem]' />
                        <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM flex justify-center items-center mt-[4px]'>Write</p>
                    </div>
                </Link>


                {/* User Profile */}
                <Link to={`/user/${userAuthentication.userName}`} className='w-full'>
                    <div className='w-full h-[35px] text-[#272727] flex bg-[#dfdfdf] hover:bg-[#272727] hover:text-[#efefef] justify-center items-center px-[0.7rem] gap-[7px] ml-auto rounded-[4px] select-none cursor-pointer'>
                        <FiUser className='TrapM text-[1rem]' />
                        <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM flex justify-center items-center mt-[4px]'>Profile</p>
                    </div>
                </Link>


                {/* dashbord */}
                <Link to='/dashboadr/blogs' className='w-full'>
                    <div className='w-full h-[35px] text-[#272727] flex bg-[#dfdfdf] hover:bg-[#272727] hover:text-[#efefef] justify-center items-center px-[0.7rem] gap-[7px] ml-auto rounded-[4px] select-none cursor-pointer'>
                        <CgEreader className='TrapM text-[1rem]' />
                        <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM flex justify-center items-center mt-[4px]'>Dashboard</p>
                    </div>
                </Link>


                {/* Settings */}
                <Link to='/settings/edit-profile' className='w-full'>
                    <div className='w-full h-[35px] text-[#272727] flex bg-[#dfdfdf] hover:bg-[#272727] hover:text-[#efefef] justify-center items-center px-[0.7rem] gap-[7px] ml-auto rounded-[4px] select-none cursor-pointer'>
                        <LuSettings className='TrapM text-[1rem]' />
                        <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM flex justify-center items-center mt-[4px]'>Settings</p>
                    </div>
                </Link>




                {/* Sign-Out container */}
                <div className='w-full h-fit flex flex-col justify-center items-center gap-[7px] mt-[10px] border-t-[1px] border-[#c2c2c2]'>

                    {/* User UserName */}
                    <div className='w-full h-fit flex justify-start items-center px-[4px] mt-[7px]'>
                        {userAuthentication.token == null ?
                            ("")
                            :
                            (
                                <>
                                    <p className='TrapM text-[13px] text-[#3f3e3e]'>@ {userAuthentication.userName}</p>
                                </>
                            )
                        }
                    </div>

                    {/* Sign-Out BTN */}
                    <div onClick={SignOutHandler} className='h-[40px] w-full px-[20px] flex justify-center items-center bg-mesh-black rounded-[4px] select-none cursor-pointer'>
                        <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM mt-[4px] text-white'>Sign Out</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserNavigationPannel