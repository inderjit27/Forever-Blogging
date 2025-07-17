import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../AppContext"
import { useNavigate } from "react-router-dom"
import BlogEditorComponent from "../components/BlogEditorComponent"
import PublishFormComponent from "../components/PublishFormComponent"

const EditorWrite = () => {

    const GO = useNavigate()
    const { userAuthentication, SetUserAuthentication } = useContext(AppContext)
    const [EditorStatusChange, SetEditorStatusChange] = useState('editor')

    // # -------------------------[ Functions ]--------------------------------
    

    
    // # ---------------------------------------------------------

    useEffect(()=>{
        if(userAuthentication.token == null){
            GO('/sign-in')
        }
    },[userAuthentication])

    return (
        <>
            {
                EditorStatusChange == 'editor' ? <BlogEditorComponent/> : <PublishFormComponent/>
            }
        </>
    )
}

export default EditorWrite