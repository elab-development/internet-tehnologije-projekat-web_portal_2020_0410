import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
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