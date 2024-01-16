import React, { useContext } from 'react'
import HeaderCustom from '../components/HeaderCustom'
import { UserContext } from '../context/UserContext'
import Signup from '../components/Signup.jsx'

export const SignupRoute = () => {
  const [token, ] = useContext(UserContext)
  
    return (
        <>
        <HeaderCustom title={"hi"}/>
        <div>
            {token ? <p>Table</p> : (<Signup/>)}
        </div>
    </>

  )
}