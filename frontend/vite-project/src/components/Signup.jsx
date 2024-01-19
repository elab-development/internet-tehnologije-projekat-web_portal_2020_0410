import { useState, useContext } from "react";
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
  InputRightElement
} from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [, setToken] = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [description, setDescription] = useState("")
  const [role,] = useState(2)
  const navigate = useNavigate();


  const handleShowClick = () => setShowPassword(!showPassword);

  const submitRegistration = async() =>{
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": username, "password": password, "first_name": firstName, "last_name": lastName, "description": description, "email": email, "role_id": role})
    }

    const response = await fetch("http://localhost:8000/users/", requestOptions);
    const data = await response.json()

    if(!response.ok){
      console.log(data.detail)
    }else{
      navigate('/')
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(password.length > 5){
      submitRegistration()
    }else{
      console.log("password needs to be at least 5 chars long")
    }
  }


  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Signup</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Input type="username" placeholder="username" value={username} 
                  onChange={(e)=>setUsername(e.target.value)} 
                  required/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Input type="first_name" placeholder="first name" value={firstName} 
                  onChange={(e)=>setFirstName(e.target.value)} 
                  required/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Input type="last_name" placeholder="last_name" value={lastName} 
                  onChange={(e)=>setLastName(e.target.value)} 
                  required/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Input type="description" placeholder="description" value={description} 
                  onChange={(e)=>setDescription(e.target.value)} 
                  required/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Input type="email" placeholder="email address" value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  required/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Have an account?{" "}
        <Link color="teal.500" href="/">
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;