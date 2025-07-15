import { createContext, useEffect, useState } from "react";
import {fetchInSession} from './src/functions/Session.jsx'

export const AppContext = createContext(null);

const ContextProvider = ({ children }) => {

    // Check User Login
    const [userAuthentication , SetUserAuthentication] = useState({token:null})

    useEffect(()=>{
        const userLogin = fetchInSession('user')
        userLogin? (SetUserAuthentication(JSON.parse(userLogin))):(SetUserAuthentication({token:null}))
    },[])



    // ------------------------------------------------
    const value = {
        userAuthentication, SetUserAuthentication,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>

    )
}

export default ContextProvider;