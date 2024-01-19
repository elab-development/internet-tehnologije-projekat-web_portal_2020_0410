import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Text } from '@chakra-ui/react'
import { UserContext } from '../context/UserContext'

export const Quote = () => {
  const [quote, setQuote] = useState("")
  const [token,] = useContext(UserContext)
  const [char, setChar] = useState("")

  useEffect(()=>{
      async function func(){
        const requestOption = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      
        const res = await fetch("http://localhost:8000/quotes", requestOption);
        if(!res.ok){
          console.log(res)
        }
        const dat = await res.json()
        setChar(dat[0].character)
        setQuote(dat[0].quote)

      }
      func()
    }, [token])

  return (
    <>
    <Text>{quote}</Text>
    </>
  )
}
