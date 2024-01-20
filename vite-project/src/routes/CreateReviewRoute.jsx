import React, { useContext } from 'react'
import HeaderCustom from '../components/HeaderCustom.jsx'
import { UserContext } from '../context/UserContext.jsx'
import Login from '../components/Login.jsx'
import CreateReview from '../components/CreateReview.jsx'

const CreateReviewRoute = () => {
  const [token, ] = useContext(UserContext)
  
    return (
        <>
        <HeaderCustom/>
        <div>
            {token ? <CreateReview/> : (<Login/>)}
        </div>
    </>

  )
}


export default CreateReviewRoute;