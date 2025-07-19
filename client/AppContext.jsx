import { createContext, useEffect, useState } from "react";
import {fetchInSession} from './src/functions/Session.jsx'

export const AppContext = createContext(null);

const ContextProvider = ({ children }) => {

    // Check User Login
    const [userAuthentication , SetUserAuthentication] = useState({token:null})

    // Editer Page Vs Publish Form
    const [EditorStatusChange, SetEditorStatusChange] = useState('editor')
    
    // Blog Info
    const [blogInfo, SetBlogInfo] = useState(
        {
            blogData: {
                title:'',
                bannerURL:'',
                bannerImgId:'',
                content:[],
                tags:[],
                desc:'',
                autherInfo: {
                    personal_Info:{
                        
                    }
                }
            }
        }
    )
    
    const [TextEditorBlog , SetTextEditorBlog] = useState({isReady: false})
    
    
    
    




    useEffect(()=>{
        const userLogin = fetchInSession('user')
        userLogin? (SetUserAuthentication(JSON.parse(userLogin))):(SetUserAuthentication({token:null}))
    },[])



    // ------------------------------------------------
    const value = {
        userAuthentication, SetUserAuthentication,
        EditorStatusChange, SetEditorStatusChange,
        blogInfo, SetBlogInfo,
        TextEditorBlog , SetTextEditorBlog,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>

    )
}

export default ContextProvider;