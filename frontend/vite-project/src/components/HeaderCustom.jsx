import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "@chakra-ui/react";

const HeaderCustom = ({title})=>{
    const [token, setToken] = useContext(UserContext)

    const handleLogout = () =>{
        setToken(null)
    }

    return(
        <div className="has-text-centered m-6">
            <h1 className="title">{title}</h1>
            {token && (<Button className="button" onClick={handleLogout}>Logout</Button>)}
        </div>
    )
}


export default HeaderCustom