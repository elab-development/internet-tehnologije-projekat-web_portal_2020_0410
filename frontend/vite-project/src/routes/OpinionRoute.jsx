import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Login from '../components/Signup.jsx'
import { Search } from '../components/Search.jsx'
import { Opinion } from '../components/Opinion.jsx'

export const OpinionRoute = () => {
  const [token, ] = useContext(UserContext)
  
    return (
        <>
        <div>
            {token ? <Opinion/> : (<Login/>)}
        </div>
    </>

  )
}