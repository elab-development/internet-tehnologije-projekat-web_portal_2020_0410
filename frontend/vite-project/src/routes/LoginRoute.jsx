import React, { useContext } from 'react'
import HeaderCustom from '../components/HeaderCustom'
import { UserContext } from '../context/UserContext'
import Login from '../components/Login'

export const LoginRoute = () => {
  const [token, ] = useContext(UserContext)
  
    return (
        <>
        <HeaderCustom title={"hi"}/>
        <div>
            {token ? <p>Table</p> : (<Login/>)}
        </div>
    </>

  )
}
