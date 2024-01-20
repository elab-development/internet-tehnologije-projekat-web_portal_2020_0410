import React, { useContext } from 'react'
import HeaderCustom from '../components/HeaderCustom'
import { UserContext } from '../context/UserContext'
import Login from '../components/Login'
import {GridLoader} from 'react-spinners'
import "./Login.css"
import { TopPosts } from '../components/TopPosts'
import useFetch from '../hooks/useFetch'

export const LoginRoute = () => {
  const [token, ] = useContext(UserContext)

  const {data: tableData, loading: loadingTop, } = useFetch("http://localhost:8000/animes/top")
  const {data: tableHot, loading: loadingHot, } = useFetch("http://localhost:8000/animes/hot")
  

    return (
        <>
        {token ?
        <>
        <HeaderCustom/>
        <Heading as="h1" mt={6} marginBottom={10}>
          Top Anime News
        </Heading>
        {loadingTop ?
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <GridLoader color="#36d7b7"/> 
        </div>
        :
        <TopPosts tableData={tableData}/>
        }
       <Heading as="h1" mt={6} marginBottom={10}>
          Hot Anime News
        </Heading>
        {loadingHot ? 
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <GridLoader color="#36d7b7"/>
        </div>  :
        <TopPosts tableData={tableHot}/>
       }
       </> 
          : (<Login/>)}
        
    </>

  )
}
