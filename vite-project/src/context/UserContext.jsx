import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export const UserProvider = (props) =>{
    const [token, setToken] = useState(localStorage.getItem("LoginToken"));

    useEffect(()=>{
        const fetchUser = async()=>{
            const requestOptions = {
                method: "GET",
                RequestMode:'no-cors',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            const response  = await fetch("http://localhost:8000/users/me", requestOptions);

            if(!response.ok){
                setToken(null)
            }
            localStorage.setItem("LoginToken", token)
        }
        fetchUser();
    }, [token])

    return(
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}