const storeDataInSession = (key, value) =>{
    return sessionStorage.setItem(key, value)
}

const fetchInSession =(key)=>{
    return sessionStorage.getItem(key)
}

const removeItemFromSession =(key)=>{
    return sessionStorage.removeItem(key)
}

const userLogOut = () =>{
    sessionStorage.clear()
}

export {storeDataInSession, fetchInSession, removeItemFromSession, userLogOut}