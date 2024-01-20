import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"


export default function useFetchBearer(url){
    
    const [token, ] = useContext(UserContext)

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(url,{headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                      }})
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { data, error, loading }

}