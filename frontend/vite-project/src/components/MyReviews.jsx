import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import HeaderCustom from './HeaderCustom'
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
import Login from './Signup'

const MyReviews = () => {
    const [token,] = useContext(UserContext)
    const [review, setReview] = useState([])
    
    useEffect(()=>{
    //const getReviews = async() =>{
        const fetchUser = async()=>{
            const requestOptions = {
                method: "GET",
                RequestMode:'no-cors',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            const response  = await fetch("http://localhost:8000/users/me", requestOptions);
            const data = await response.json()
            const user_id = data.user_id
            
            const requestOption = {
                method: "GET",
                RequestMode:'no-cors',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            const res  = await fetch(`http://localhost:8000/reviews/user?user_id=${user_id}`, requestOption);
            const d = await res.json()
            setReview(d)

        }
        fetchUser()
    }, [])
   
  
    return (
        <>
        <div>
            {token ?
            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Anime</Th>
                  <Th>Rating</Th>
                  <Th>Comment</Th>
                </Tr>
            </Thead>
            <Tbody>
              {review.map((item =>
              <Tr>
                <Td>{item.anime}</Td>
                <Td>{item.review_rating}</Td>
                <Td>{item.comment}</Td>
              </Tr>
              
              ))}
              </Tbody>
            </Table>
          </TableContainer> 
          : (<Login/>)}
        </div>
    </>
  )}

export default MyReviews;
