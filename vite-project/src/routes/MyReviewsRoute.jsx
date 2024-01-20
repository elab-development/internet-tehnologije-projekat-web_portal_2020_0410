import React, { useContext } from 'react'
import HeaderCustom from '../components/HeaderCustom'
import { UserContext } from '../context/UserContext'
import MyReviews from '../components/MyReviews'
import Login from '../components/Login'

const MyReviewsRoute = () => {
  const [token, ] = useContext(UserContext)
  
    return (
        <>
        <HeaderCustom/>
        <div>
            {token ? <MyReviews/> : (<Login/>)}
        </div>
    </>

  )
}


export default MyReviewsRoute;