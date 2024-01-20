import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Signup from '../components/Signup.jsx'
import { LoginRoute } from './LoginRoute.jsx'

export const SignupRoute = () => {
  const [token, ] = useContext(UserContext)
  
    return (
        <>
        <div>
            {token ? <LoginRoute/> : (<Signup/>)}
        </div>
    </>

  )
}