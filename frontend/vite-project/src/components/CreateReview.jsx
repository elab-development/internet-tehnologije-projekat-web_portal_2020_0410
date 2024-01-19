import React from 'react'
import { useContext, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  FormLabel
} from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";

const CreateReview = () => {
    const [anime, setAnime] = useState("")
    const [userID, setUserID] = useState(0)
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")
    const [token,] = useContext(UserContext)


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
            if(!response.ok){
                console.log(response)
            }
            setUserID(data.user_id)
        }
        fetchUser()
    }, [])

    const createReview = async (ani, use, rat, con ) =>{
        const requestOption = {
          method: "POST",
          RequestMode:'no-cors',
          headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            "anime_name": ani,
            "user_id": use,
            "rating": rat,
            "content": con
          })
      }
      const res  = await fetch(`http://localhost:8000/reviews/`, requestOption);
      if(!res.status == 201){
        console.log('error')
      }
    }
    
    function refreshPage() {
      window.location.reload(false);
    }


  return (

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
                value={anime}
                onChange={(e)=>setAnime(e.target.value)}
                required
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
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={()=>{createReview(anime, userID, rating, content);refreshPage()}}
            >
              Create
            </Button>
          </Stack>
        </form>
  )
}

export default CreateReview;
