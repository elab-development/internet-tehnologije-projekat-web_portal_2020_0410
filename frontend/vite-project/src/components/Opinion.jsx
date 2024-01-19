import React, { useState } from 'react'
import { Card, Text, CardHeader, Button, CardFooter, Heading, CardBody } from '@chakra-ui/react'
import HeaderCustom from './HeaderCustom'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

export const Opinion = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [opinion, setOpinion] = useState("")
    const [name, setName] = useState("")
    const [historyName, setHistoryName] = useState("")

    async function func(){
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      
        const response = await fetch(`http://localhost:8000/animes/opinion?anime_name=${name}`, requestOptions)
        const data = await response.json()
      
        if(!response.ok){
          console.log(response)
        }
        setOpinion(data[name])
        setHistoryName(name)
      }

  return (
    <>
    <HeaderCustom/>
    <Card align='center'>
  <CardHeader>
    <Heading size='md'> Get public opinion</Heading>
  </CardHeader>
  <CardBody>
    <Text>Using web scraping and neural nets we can get public opinion regarding some anime</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue' onClick={onOpen}>View here</Button>
  </CardFooter>
  <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reddit opinion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <InputGroup borderRadius={5} size="sm" marginTop={5} marginLeft={5}>
        <InputLeftElement
          pointerEvents="none"
        />
        <Input type="text" placeholder="Search..." border="1px solid #949494" value={name} onChange={(e)=>setName(e.target.value)} >
        </Input>
        <InputRightAddon
          p={0}
          border="none"
          marginRight={10}
        >
          <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494" onClick={func}>
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
      <InputGroup>
      <Input value={historyName} disabled>
      </Input>
      <Input value={opinion} disabled>
      </Input>
      </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{onClose();setHistoryName(""), setOpinion("")}}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</Card>
</>
  )
}
