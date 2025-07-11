import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const InputForm = ({ type, name, id, placeholder, icon, }) => {

    const [PaswordStatusVisible, SetPaswordStatusVisible] = useState(false)

    return (
        <>

            <div className={` max-md:w-[300px] md:w-[450px] relative mt-[20px] rounded-[4px]`}>
                <input
                    className="w-full bg-amber-200 px-[50px] py-[0.7rem] bg-regular-white border-none outline-none TrapM text-mesh-black"
                    type={type == 'password' ? PaswordStatusVisible ? 'text' : type : type}
                    name={name} placeholder={placeholder} id={id}
                />

                <div className="w-fit h-fit flex justify-center items-center absolute top-3.5 left-4 text-mesh-black">
                    {icon}
                </div>

                {
                    type == 'password' && (
                        <div onClick={() => SetPaswordStatusVisible((currect) => !currect)} className="w-fit h-fit flex justify-center items-center absolute top-4 right-4 select-none cursor-pointer">
                            {
                                PaswordStatusVisible ? (<FaRegEye className="text-mesh-black" />) : (<FaRegEyeSlash className="text-mesh-black" />)
                            }
                        </div>
                    )
                }



            </div>


        </>
    )
}

export default InputForm