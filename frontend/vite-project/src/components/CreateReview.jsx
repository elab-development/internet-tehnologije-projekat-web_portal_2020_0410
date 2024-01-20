import React from 'react'
import { useContext, useEffect, useState } from "react";
import {
  Input,
  Button,
  InputGroup,
  Stack,
  Link,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";
import useFetchBearer from '../hooks/useFetchBearer';

const CreateReview = () => {
    const [anime, setAnime] = useState("")
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")
    const [token,] = useContext(UserContext)

    const {data: user, } = useFetchBearer("http://localhost:8000/users/me")

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

      refreshPage()
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
            marginLeft={40}
            marginRight={40}
          >
            <FormControl>
            <FormLabel>User ID</FormLabel>
            {user !== null &&
              <InputGroup>
                <Input
                value={user.user_id}
                disabled
                />
              </InputGroup>}
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
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={()=>{createReview(anime, user.user_id, rating, content);}}
            >
              Create
            </Button>
            <Link href='/my_reviews'>
            <Button
            borderRadius={0}
            variant="solid"
            width="full"
            >
              Back
            </Button>
            </Link>
          </Stack>
        </form>
  )
}

export default CreateReview;
