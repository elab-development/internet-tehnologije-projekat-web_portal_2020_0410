import React, { useContext, useEffect, useState} from 'react'
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
    Flex,
    Heading,
    Input,
    Button,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    FormLabel,
    InputGroup
  } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Login from './Signup'

const MyReviews = () => {
    const [token,] = useContext(UserContext)
    const [review, setReview] = useState([])
    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

    const [title, setTitle] = useState("")
    const [userID, setUserID] = useState(0)
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")
    const [focused, setFocused] = useState({anime: "", review_rating: 0, content: ""})
    const [asc, setAsc] = useState(false)
    const [ascComment, setAscComment] = useState(false)
    const [ascAnime, setAscAnime] = useState(false)
    
  
    useEffect(()=>{
      async function func(){
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      
        const response = await fetch("http://localhost:8000/users/me", requestOptions);
        const data = await response.json()
      
        if(!response.ok){
          console.log(response)
        }
        setTitle(data["username"])
      }
      func()
    }, [token])
    
    useEffect(()=>{
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
            const res  = await fetch(`http://localhost:8000/reviews/user?user_id=${user_id}&ascending=${asc}`, requestOption);
            const d = await res.json()
            setReview(d)
            setUserID(user_id)

        }
        fetchUser()
    }, [asc])

    useEffect(()=>{
        const fetchUser = async()=>{
        const requestOption = {
          method: "GET",
          RequestMode:'no-cors',
          headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
        }
        const res  = await fetch(`http://localhost:8000/reviews/user/name?user_id=${userID}&ascending=${ascAnime}`, requestOption);
        const d = await res.json()
        setReview(d)
      }
      fetchUser()
    }, [ascAnime])

    useEffect(()=>{
      const fetchUser = async()=>{
      const requestOption = {
        method: "GET",
        RequestMode:'no-cors',
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
      }
      const res  = await fetch(`http://localhost:8000/reviews/user/comment?user_id=${userID}&ascending=${ascComment}`, requestOption);
      const d = await res.json()
      setReview(d)
    }
    fetchUser()
  }, [ascComment])



    const deleteReview = async (anime_name) =>{
        const requestOption = {
          method: "DELETE",
          RequestMode:'no-cors',
          headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
      }
      const res  = await fetch(`http://localhost:8000/reviews/?username=${title}&anime_name=${anime_name}`, requestOption);
      if(!res.status == 201){
        console.log('error')
      }

      refreshPage();
    }
    
    function refreshPage() {
      window.location.reload(false);
    }
   
    const updateReview = async (anime_name) =>{
      const requestOption = {
        method: "PUT",
        RequestMode:'no-cors',
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          "rating": rating,
          "content": content
        })
    }
    const res  = await fetch(`http://localhost:8000/reviews/?username=${title}&anime_name=${anime_name}`, requestOption);
    if(!res.ok){
      console.log(res.json())
    }
    refreshPage();
  }

  
    return (
        <>
        <div>
            {token ?
            <>
            <Link href='/review/create'>
              <Button>Create</Button>
            </Link>

            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th onClick={()=>{setAscAnime(!ascAnime);}}>Anime</Th>
                  <Th onClick={()=>{setAsc(!asc);}}>Rating</Th>
                  <Th onClick={()=>{setAscComment(!ascComment);}}>Comment</Th>
                </Tr>
            </Thead>
            <Tbody>
              {review.length>0 && review.map((item =>
              <Tr key={item.anime}>
                <Td>{item.anime}</Td>
                <Td>{item.review_rating}</Td>
                <Td>{item.comment}</Td>
                <Td>
                  <Button onClick={()=>{onEditOpen();setFocused(item)}}>Edit</Button>
                  <Modal isOpen={isEditOpen} onClose={onEditClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Edit</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                      <form onSubmit={()=>{}}>
                        <Stack
                          spacing={4}
                          p="1rem"
                          backgroundColor="whiteAlpha.900"
                          boxShadow="md"
                        >
                          <FormControl>
                          <FormLabel>User ID</FormLabel>
                            <InputGroup>
                              <Input
                              value={userID}
                              disabled
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                          <FormLabel>Anime name</FormLabel>
                            <InputGroup>
                              <Input
                              value={focused.anime}
                              disabled
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Rating</FormLabel>
                            <InputGroup>
                              <Input
                              value={rating}
                              onChange={(e)=>setRating(e.target.value)}
                              required
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                          <FormLabel>Content</FormLabel>
                            <InputGroup>
                              <Input
                              value={content}
                              onChange={(e)=>setContent(e.target.value)}
                              required
                              />
                            </InputGroup>
                          </FormControl>
                        </Stack>
                      </form>
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onEditClose}>
                          Cancel
                        </Button>
                        <Button variant='ghost' onClick={()=> {onEditClose();updateReview(focused.anime);}}>Confirm</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Td>
                <Td>
                  <Button onClick={onDeleteOpen}>Delete</Button>
                  <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Delete</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Are you sure you want to delete this review?
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onDeleteClose}>
                          Cancel
                        </Button>
                        <Button variant='ghost' onClick={()=> {onDeleteClose();deleteReview(item.anime);}}>Confirm</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Td>
              </Tr>    
              ))}
              </Tbody>
            </Table>
          </TableContainer>
          </> 
          : (<Login/>)}
        </div>
    </>
  )}

export default MyReviews;