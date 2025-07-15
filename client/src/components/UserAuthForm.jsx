import InputForm from "./InputForm"
import { FiUser } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { BsKey } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { useContext, useEffect, useRef } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useState } from "react";
import { storeDataInSession } from '../functions/Session'
import { AppContext } from "../../AppContext";

const UserAuthForm = ({ type }) => {

    const { userAuthentication, SetUserAuthentication } = useContext(AppContext)
    const GO = useNavigate()
    const [loadingBTNstatus, SetloadingBTNstatus] = useState(false)
    const userAuthForm = useRef()

    // #FUNCTIONS ----------------------------------------------------------------------

    const SubmitSignUpFormHandler = async (e) => {
        e.preventDefault();

        let forms = new FormData(userAuthForm.current)
        let storData = {}

        for (let [key, value] of forms.entries()) {
            storData[key] = value
        }

        try {
            SetloadingBTNstatus(true)
            const respSingUp = await axios.post(`${import.meta.env.VITE_BackendURL}/auth/sign-up`, storData, { withCredentials: true })

            if (respSingUp.data.Success == false) {
                SetloadingBTNstatus(false)
                toast.error(respSingUp.data.Message)
            }
            else {
                SetloadingBTNstatus(false)
                toast.success(respSingUp.data.Message)
            }
        } catch (error) {
            SetloadingBTNstatus(false)
            console.log(error)
        }
    }

    const SubmitSignINFormHandler = async (e) => {
        e.preventDefault();

        let forms = new FormData(userAuthForm.current)
        let storDatain = {}

        for (let [key, value] of forms.entries()) {
            storDatain[key] = value
        }


        try {
            SetloadingBTNstatus(true)
            const respSingIp = await axios.post(`${import.meta.env.VITE_BackendURL}/auth/sign-in`, storDatain, { withCredentials: true })

            if (respSingIp.data.Success == false) {
                SetloadingBTNstatus(false)
                toast.error(respSingIp.data.Message)
            }
            else {
                SetloadingBTNstatus(false)
                storeDataInSession("user", JSON.stringify(respSingIp.data.Data))
                SetUserAuthentication(respSingIp.data.Data)
                toast.success(respSingIp.data.Message)
            }
        } catch (error) {
            SetloadingBTNstatus(false)
            console.log(error)
        }
    }


    // ---------------------------------------------------------------------------------

    useEffect(() => {
        if (userAuthentication.token !== null) {
            GO('/');
        }
    }, [userAuthentication])


    return (
        <>

            <div className="w-full h-fit flex flex-col">

                <form ref={userAuthForm} className="w-full h-fit flex flex-col justify-center items-center mt-[50px]">

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
                            loadingBTNstatus ?
                                (
                                    <>
                                        <div className="w-full h-fit flex justify-center items-center bg-mesh-black text-white px-[20px] py-[20px]  text-[1rem] leading-[1rem] TrapM select-none cursor-pointer">
                                            Loading ...
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {
                                            type === 'sign-up' ?
                                                (
                                                    <div onClick={SubmitSignUpFormHandler} className="w-full h-fit flex justify-center items-center bg-mesh-black text-white px-[20px] py-[20px]  text-[1rem] leading-[1rem] TrapM select-none cursor-pointer ">
                                                        Sign Up
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div onClick={SubmitSignINFormHandler} className="w-full h-fit flex justify-center items-center bg-mesh-black text-white px-[20px] py-[20px]  text-[1rem] leading-[1rem] TrapM select-none cursor-pointer">
                                                        Sign In
                                                    </div>
                                                )
                                        }
                                    </>
                                )


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




                </form>

            </div>

        </>
    )
}

export default UserAuthForm