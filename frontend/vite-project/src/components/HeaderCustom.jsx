import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "@chakra-ui/react";
import NavBar from "./Navbar";

const HeaderCustom = ()=>{
    const [token,] = useContext(UserContext)
    return(
        <div className="has-text-centered m-6">
            <div className="nav">
                {token && <NavBar/>}
            </div>
            
        </div>
    )
}


export default HeaderCustom