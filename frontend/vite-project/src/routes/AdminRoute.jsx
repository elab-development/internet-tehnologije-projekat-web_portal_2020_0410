import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Signup from '../components/Signup.jsx'
import { LoginRoute } from './LoginRoute.jsx'
import { Admin } from '../components/Admin.jsx'
import Login from '../components/Login.jsx'

export const AdminRoute = () => {
    const [token, ] = useContext(UserContext)
  
    return (
        <>
        <div>
            {token ? <Admin/> : (<Login/>)}
        </div>
    </>

  )
}