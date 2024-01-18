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
} from '@chakra-ui/react'

export const LoginRoute = () => {
  const [token, ] = useContext(UserContext)
  const [tableData, setTableData] = useState([])
  
  
  useEffect(()=>{
    async function f(){
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
      setTableData(data)
    }
    f()
    
  }, [])

  


    return (
        <>
        <HeaderCustom/>
        <div>
            {token ?
            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>upvote ratio</Th>
                  <Th>upvotes</Th>
                  <Th>permalink</Th>
                </Tr>
            </Thead>
            <Tbody>
              {tableData.map((item =>
              <Tr>
                <Td>{item.title}</Td>
                <Td>{item.upvote_ratio}</Td>
                <Td>{item.ups}</Td>
                <Td>{item.permalink}</Td>
              </Tr>
              
              ))}
              </Tbody>
            </Table>
          </TableContainer> 
          : (<Login/>)}
        </div>
    </>

  )
}
