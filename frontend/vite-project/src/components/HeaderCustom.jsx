import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "@chakra-ui/react";
import NavBar from "./Navbar";

const HeaderCustom = ()=>{
    const [token, setToken] = useContext(UserContext)
    const handleLogout = () =>{
        setToken(null)
    }
    return(
        <div className="has-text-centered m-6">
            <div className="nav">
                {token && <NavBar/>}
                {token && (<Button className="button" onClick={handleLogout}>Logout</Button>)}
            </div>
            
        </div>
    )
}


export default HeaderCustom