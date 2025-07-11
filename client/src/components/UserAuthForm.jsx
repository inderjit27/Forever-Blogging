import InputForm from "./InputForm"
import { FiUser } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { BsKey } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom'

const UserAuthForm = ({ type }) => {
    return (
        <>
            <div className="w-full h-fit flex flex-col">

                <div className="w-full h-fit flex flex-col justify-center items-center mt-[50px]">

                    <h2 className="TrapSB text-[1.7rem] leading-[1.7rem] tracking-tight text-mesh-black mb-[10px] ">
                        {type == 'sign-in' ?
                            ('Welcome Back')
                            :
                            ('Create Account')
                        }
                    </h2>

                    <p className="TrapM text-[1rem] lMading-[1rem] tracking-tight text-mesh-black mb-[40px] ">
                        {type == 'sign-in' ?
                            <div className="max-md:w-[300px] md:w-[450px] flex justify-center items-center flex-wrap tracking-tight">
                                Joining Again !
                            </div>
                            :
                            <div className="max-md:w-[300px] md:w-[450px] flex justify-center items-center flex-wrap">
                                Join Us Today !
                            </div>
                        }
                    </p>

                    {
                        // Name
                        type == 'sign-up' &&
                        (<InputForm
                            type={'text'}
                            name={'name'}
                            placeholder={'Enter Name'}
                            icon={<FiUser className="text-[18px]" />}
                        />)
                    }

                    {/* Email */}
                    <InputForm
                        type={'email'}
                        name={'email'}
                        placeholder={'Enter Email'}
                        icon={<MdAlternateEmail className="text-[18px]" />}
                    />


                    {/* Password */}
                    <InputForm
                        type={'password'}
                        name={'password'}
                        placeholder={'Enter Password'}
                        icon={<BsKey className="text-[20px]" />}
                    />

                    <div className="max-md:w-[300px] md:w-[450px] flex justify-center items-center mt-[27px]">

                        {/* Button */}

                        {
                            type == 'sign-up' ?
                                <div className="w-full h-fit flex justify-center items-center bg-mesh-black text-white px-[20px] py-[20px]  text-[1rem] leading-[1rem] TrapM select-none cursor-pointer ">
                                    Sign Up
                                </div>
                                :
                                <div className="w-full h-fit flex justify-center items-center bg-mesh-black text-white px-[20px] py-[20px]  text-[1rem] leading-[1rem] TrapM select-none cursor-pointer">
                                    Sign In
                                </div>
                        }

                    </div>

                    {/* Line */}
                    <div className="max-md:w-[300px] md:w-[450px] h-[30px]  my-[40px] flex justify-center items-center relative" >

                        <div className="h-[1px] w-full bg-[#adadad]"></div>

                        <p className=" absolute w-fit h-fit text-[1rem] leading-[1rem] TrapM px-[7px] bg-mesh-white">or</p>

                    </div>

                    <div className="max-md:w-[300px] md:w-[450px] h-fit flex flex-col justify-center items-center">

                        {/* Google */}
                        <div className="w-full h-fit flex justify-center items-center bg-mesh-black text-white px-[20px] py-[15px]  text-[1rem] leading-[1rem] TrapM select-none cursor-pointer gap-[10px]">
                            <FcGoogle className="text-[27px]" /> Continue With Google
                        </div>

                        {
                            type == 'sign-in' ?

                                <p className="TrapR mt-[15px] select-none cursor-pointer">
                                    <span className="text-mesh-black tracking-tight">Create new account ? </span>
                                    <Link to='/sign-up' className="underline TrapM text-[#245bd3]">Sign Up</Link>
                                </p>
                                :
                                <p className="TrapR mt-[15px] select-none cursor-pointer">
                                    <span className="text-mesh-black tracking-tight">Already i have an account ? </span>
                                    <Link to='/sign-in' className="underline TrapM text-[#245bd3]">Sign in</Link>
                                </p>
                        }



                    </div>




                </div>

            </div>
        </>
    )
}

export default UserAuthForm