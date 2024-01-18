import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Login from '../components/Signup.jsx'
import { Search } from '../components/Search.jsx'

export const SearchRoute = () => {
  const [token, ] = useContext(UserContext)
  
    return (
        <>
        <div>
            {token ? <Search/> : (<Login/>)}
        </div>
    </>

  )
}