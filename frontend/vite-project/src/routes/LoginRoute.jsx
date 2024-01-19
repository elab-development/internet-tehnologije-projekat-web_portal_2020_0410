import React, { useContext, useEffect, useState } from 'react'
import HeaderCustom from '../components/HeaderCustom'
import { UserContext } from '../context/UserContext'
import Login from '../components/Login'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Card,
  SimpleGrid,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Text,
  Grid,
  Link,
} from '@chakra-ui/react'
import {GridLoader} from 'react-spinners'

export const LoginRoute = () => {
  const [token, ] = useContext(UserContext)
  const [tableData, setTableData] = useState([])
  const [tableHot, setTableHot] = useState([])
  const [loadingTop, setLoadingTop] = useState(true)
  const [loadingHot, setLoadingHot] = useState(true)
  
  
  useEffect(()=>{
    async function f(){
      try{
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      
        const response = await fetch("http://localhost:8000/animes/top", requestOptions);
        if(!response.ok){
          console.log('oh no')
        }
        const data = await response.json()
        setTableData(data.slice(0, 7))
      } finally{
        setLoadingTop(false)
      }
      
    }

    async function g(){
      try{
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      
        const response = await fetch("http://localhost:8000/animes/hot", requestOptions);
        if(!response.ok){
          console.log('oh no')
        }
        const data = await response.json()
        setTableHot(data.slice(0, 7))
      }finally{
        setLoadingHot(false)
      }
    }
    f()
    g()
    
  }, [])

  


    return (
        <>
        {token ?
        <>
        <HeaderCustom/>
        <Heading as="h1" mt={6} marginBottom={5}>
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
        <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' style={{display: 'flex', justifyContent: 'space-evenly'}}>
          
        { tableData.map((item) => (
            <Card size={'md'} style={{flex: '1 1 0'}}>
            <CardHeader size='l'>
              <Heading size='md' > {`${item.title.slice(0,35)}...`}</Heading>
            </CardHeader>
            <CardBody>
              <Text>Upvote ratio: {item.upvote_ratio}</Text>
              <Text>Upvotes: {item.ups}</Text>
            </CardBody>
            <CardFooter>
              <a target='_blank'
            rel='noopener noreferrer' href={`https://www.reddit.com/${item.permalink}`}>
              <Button>View here</Button>
              </a>
            </CardFooter>
          </Card>
            
            
        ))}
       </SimpleGrid>
        }
       <Heading as="h1" mt={6} marginBottom={5}>
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
        <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' style={{display: 'flex'}}>   
        { tableHot.map((item) => (
            <Card size={'md'} style={{flex: '1 1 0'}}>
            <CardHeader>
              <Heading size='md' >{`${item.title.slice(0,35)}...`}</Heading>
            </CardHeader>
            <CardBody>
              <Text>Upvote ratio: {item.upvote_ratio}</Text>
              <Text>Upvotes: {item.ups}</Text>
            </CardBody>
            <CardFooter>
              <a target='_blank'
            rel='noopener noreferrer' href={`https://www.reddit.com/${item.permalink}`}>
              <Button>View here</Button>
              </a>
            </CardFooter>
          </Card>    
        ))}
       </SimpleGrid>
       }
       </> 
          : (<Login/>)}
        
    </>

  )
}
