import React from 'react'
import HeaderCustom from './HeaderCustom'
import { Quote } from './Quote'
import { Button, Input, InputGroup} from '@chakra-ui/react'
import { UserContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalBody, ModalFooter, ModalContent, ModalCloseButton, ModalHeader,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Card,
  Heading,
  CardBody,
  Text,
  Stack, StackDivider,Box, CardHeader
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import { Chart } from "react-google-charts";
import { CSVLink } from "react-csv";

import {GridLoader} from 'react-spinners'
import useFetchBearer from '../hooks/useFetchBearer';
import { AdminCard } from './AdminCard';
import { TableBestRated } from './TableBestRated';


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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenInspire, onOpen: onOpenInspire, onClose: onCloseInspire } = useDisclosure()

    const [newPassword, setNewPassword] = useState("")
    const [csvData, setCsvData] = useState([])

    const [plot, setPlot] = useState([])
    const [story, setStory] = useState("")
    const [loadingTop, setLoadingTop] = useState(true)

    const {data, loading,} = useFetchBearer("http://localhost:8000/users/me")
    const {data: bestRated, loading: loadingBestRated, } = useFetchBearer("http://localhost:8000/reviews/top?limit=5")

    useEffect(()=>{
        async function func(){
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
                "first_name": data.first_name,
                "last_name": data.last_name,
                "description": data.description,
                "role_id": data.role_id
              })
        }
        const res  = await fetch(`http://localhost:8000/users/?user_id=${data.user_id}`, requestOption);
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
        {loading ? <GridLoader/> : <AdminCard data={data}/>}
        {loadingBestRated ? <GridLoader/> : <TableBestRated bestRated={bestRated}/>}
    </InputGroup>
    <InputGroup marginLeft={10} style={{display:'flex', justifyContent: 'space-around'}}>
      <Stack marginLeft={10} marginTop={5}>
          <Button onClick={onOpen}>
              Change password
          </Button>
          <Button onClick={()=>{onOpenInspire();getStory()}}>
              Inspire me
          </Button>
          {data !== null && data.role_id == 1 && <CSVLink data={csvData}>Download report</CSVLink>}
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
