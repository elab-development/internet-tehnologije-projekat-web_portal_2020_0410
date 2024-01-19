import React from 'react'
import HeaderCustom from './HeaderCustom'
import { Quote } from './Quote'
import { Button, Input, InputGroup, background } from '@chakra-ui/react'
import { UserContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalBody, ModalFooter, ModalContent, ModalCloseButton, ModalHeader,
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
  Text,
  Grid,
  Link,Stack, StackDivider,Box
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import { Chart } from "react-google-charts";
import { CSVLink, CSVDownload } from "react-csv";

import {GridLoader} from 'react-spinners'


export const options = {
    title: "Number of animes in each genre",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total",
      minValue: 0,
    },
    vAxis: {
      title: "Genre",
    },
  };

export const Admin = () => {
    const [token, ] = useContext(UserContext)
    const [userID, setUserID] = useState(0)
    const [username, setUsername] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [email, setEmail] = useState("")
    const [desc, setDesc] = useState("")
    const [role, setRole] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenInspire, onOpen: onOpenInspire, onClose: onCloseInspire } = useDisclosure()

    const [bestRated, setBestRated] = useState([])
    const [newPassword, setNewPassword] = useState("")
    const [csvData, setCsvData] = useState([])

    const [plot, setPlot] = useState([])
    const [story, setStory] = useState("")
    const [loadingTop, setLoadingTop] = useState(true)

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
          setDesc(data.description)
          setEmail(data.email)
          setFirst(data.first_name)
          setLast(data.last_name)
          setUserID(data.user_id)
          setUsername(data.username)
          setRole(data.role_id)

          const requestOption = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        
          const respons = await fetch("http://localhost:8000/reviews/top?limit=5", requestOption);
          const dat = await respons.json()
        
          if(!respons.ok){
            console.log(response)
          }
          setBestRated(dat)
          
          const requestOp = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        
          const respo = await fetch("http://127.0.0.1:8000/users/", requestOp);
          const da = await respo.json()
        
          if(!respo.ok){
            console.log(respo)
          }

          const c = [["user_id", "username", "first_name", "last_name", "description", "email", "role_id"]]
          for(let i = 0;i<da.length;i++){
            c.push([da[i].user_id, da[i].username, da[i].first_name, da[i].last_name, da[i].description, da[i].email, da[i].role_id])
          }
          
          setCsvData(c)
        }


        func()
        getStats()
      }, [token])


      const changePassword = async (password)=>{
        const requestOption = {
            method: "PUT",
            RequestMode:'no-cors',
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(
                {
                "password": password,
                "first_name": first,
                "last_name": last,
                "description": desc,
                "role_id": role
              })
        }
        const res  = await fetch(`http://localhost:8000/users/?user_id=${userID}`, requestOption);
        if(!res.ok){
          console.log(res.json())
        }
      }

      const getStory = async ()=>{
        const requestOption = {
          method: "GET",
          RequestMode:'no-cors',
          headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          },
        }
        const res  = await fetch(`http://localhost:8000/animes/story`, requestOption);
        if(!res.ok){
          console.log(res.json())
        }

        const data = await res.json()
        setStory(data.story)
        setLoadingTop(false)
      }


      const getStats = async ()=>{
        const requestOption = {
            method: "GET",
            RequestMode:'no-cors',
            headers:{
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
        }
        const res  = await fetch(`http://localhost:8000/animes/stats`, requestOption);
        if(!res.ok){
          console.log(res.json())
        }

        const data = await res.json()
        const r = [["type", 'number'],]
        data.map((item)=>{return [item.type,item.number]}).forEach(element => {
            r.push(element)
        });
        setPlot(r)
      }
  
  
    return (
    <>
    <HeaderCustom/>
    <InputGroup style={{display:'flex', justifyContent: 'space-around'}}>
        <Card marginLeft={10} width={650} marginRight={10}>
          <CardHeader>
            <Heading size='md'>Account Report</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Username
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {username}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Email
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {email}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Description
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {desc}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Quote
                </Heading>
                <Text pt='2' fontSize='sm'>
                  <Quote/>
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Table variant='striped' colorScheme='teal' marginRight={20}>
          <TableCaption>Top 5 best rated animes</TableCaption>
            <Thead>
                <Tr>
                <Th>Anime</Th>
                <Th>Rating</Th>
                </Tr>
            </Thead>
            <Tbody>
            {bestRated.length > 0 && bestRated.map((item) =>
            <Tr key={item.anime}>
                <Td>{item.anime}</Td>
                <Td>{item.rating}</Td>
                </Tr>)}
            </Tbody>
        </Table>
    </InputGroup>
    <InputGroup marginLeft={10} style={{display:'flex', justifyContent: 'space-around'}}>
      <Stack marginLeft={10} marginTop={5}>
          <Button onClick={onOpen}>
              Change password
          </Button>
          <Button onClick={()=>{onOpenInspire();getStory()}}>
              Inspire me
          </Button>
          {role == 1 && <CSVLink data={csvData}>Download report</CSVLink>}
      </Stack>
        <Chart
        chartType="BarChart"
        width="70%"
        height="250px"
        data={plot}
        options={options}
      />
    </InputGroup>
    <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
    >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} ></Input>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme='green' onClick={()=>{changePassword(newPassword);onClose()}}>Confirm</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    <Modal
        isCentered
        onClose={()=>{onCloseInspire();setLoadingTop(true)}}
        isOpen={isOpenInspire}
        motionPreset='slideInBottom'
    >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Story</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{display: 'flex', justifyContent: 'center'}}>
            {loadingTop ? <GridLoader/> :<Text>{story}</Text>}
        </ModalBody>
        </ModalContent>
    </Modal>
    </>
  )
}
