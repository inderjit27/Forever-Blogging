import { useState } from 'react';
import Logo from '../data/logo.svg'
import { FiSearch } from "react-icons/fi";
import { LuFilePenLine } from "react-icons/lu";
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

const NavBarComponent = () => {

    const [SearchActiveStatus, SetSearchActiveStatus] = useState(false)

    return (
        <>
            <div className="w-full h-fit flex  relative
            max-md:px-[1rem] max-md:py-[0.7rem] border-b-[1px] border-[#bbbbbb] md:px-[2rem] md:py-[1rem]">

                {/* Logo-Container -------------------------------------------------------------------------- */}
                <Link to='/'>
                    <div className="w-[35px] h-[40px] flex justify-center items-center cursor-pointer select-none">
                        <img src={Logo} className='w-full ' />
                    </div>
                </Link>

                {/* Search-Box-Container --------------------------------------------------------------------- */}
                <div className={`max-md:w-full h-fit bg-mesh-white max-md:absolute relative top-[100%] left-0 max-md:px-[1rem] max-md:py-[1rem] max-md:mt-[0.1rem] max-md:border-b-[1px] max-md:border-[#bbbbbb] md:opacity-100 md:ml-[17px]  ` + (SearchActiveStatus ? 'Show-Status' : 'Hide-Status')}>

                    {/* Search-Box */}
                    <input type='text' placeholder='Search' className='w-full h-[45px] md:h-[40px] rounded-full bg-regular-white px-[17px] pr-[50px] TrapM' />

                    {/* Search-Icon */}
                    <div className='w-[45px] h-[45px] md:w-[40px] md:h-[40px] absolute max-md:top-4 top-0 max-md:right-4 right-0  rounded-full flex justify-center items-center cursor-pointer select-none'>

                        <FiSearch className='text-[24px] text-mesh-black' />

                    </div>

                </div>

                <div className='w-fit h-[40px] flex ml-auto'>

                    {/* Menu-Search-Icon for Active ----------------------------------------------------------- */}
                    <div onClick={() => SetSearchActiveStatus((current) => !current)}
                        className='w-[40px] h-[40px] bg-regular-white flex justify-center items-center rounded-full ml-auto select-none cursor-pointer md:hidden'>
                        <FiSearch className='text-[22px] text-mesh-black' />
                    </div>


                    {/* Write Blog BTN ------------------------------------------------------------------------- */}
                    <Link to='/editor' className='ml-auto'>
                        <div className='w-fit h-[40px] flex bg-regular-white justify-center items-center px-[0.7rem] gap-[7px] ml-auto rounded-[7px] select-none cursor-pointer max-md:hidden'>
                            <LuFilePenLine className='TrapM text-[1rem]' />
                            <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM flex justify-center items-center mt-[4px]'>Write</p>
                        </div>
                    </Link>

                    {/* Sign In BTN  ----------------------------------------------------------------------------*/}
                    <Link to='/sign-in'>
                        <div className='h-[40px] w-fit px-[20px] flex justify-center items-center bg-mesh-black rounded-full ml-[10px] select-none cursor-pointer'>
                            <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM mt-[4px] text-white'>Sign In</p>
                        </div>
                    </Link>

                    {/* Sign Up BTN ----------------------------------------------------------------------------- */}
                    <Link to='/sign-up'>
                        <div className='h-[40px] w-fit px-[20px] flex justify-center items-center bg-regular-white rounded-full ml-[4px] select-none cursor-pointer max-md:hidden'>
                            <p className='text-[0.9rem] leading-[0.9rem] tracking-tight TrapM mt-[4px] text-mesh-black'>Sign Up</p>
                        </div>
                    </Link>
                </div>

            </div>

            <Outlet/>
        </>
    )
}

export default NavBarComponent