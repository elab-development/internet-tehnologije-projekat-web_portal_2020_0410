import React, {useState, useContext, useEffect } from "react";
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, FormControl, FormLabel, useDisclosure
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import HeaderCustom from "./HeaderCustom";
import { UserContext } from "../context/UserContext";

export const Search = () => {
    const [anime, setAnime] = useState("")
    const [token,] = useContext(UserContext)
    const [page, setPage] = useState(1)
    const [tableData, setTableData] = useState([])
    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()

    const [ascTitle, setAscTitle] = useState(false)
    const [ascScore, setAscScore] = useState(false)
    const [ascGenres, setAscGenres] = useState(false)
    const [ascType, setAscType] = useState(false)
    const [last, setLast] = useState("title")
    const [focused, setFocused] = useState({name: "", score: 0, genres: "", type: ""})

    const [revw, setRevs] = useState("no reviews")
    
    const searchAnime = async () =>{
        const requestOption = {
          method: "GET",
          RequestMode:'no-cors',
          headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
      }
      const res  = await fetch(`http://127.0.0.1:8000/animes/search?anime_name=${anime}&ascending=true&page=${page}&size=10`, requestOption);
      if(!res.status == 201){
        console.log('error')
      }
      const data = await res.json()
      setTableData(data.items)
    }

    useEffect(()=>{
        const name = async ()=> {
            const requestOption = {
                method: "GET",
                RequestMode:'no-cors',
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
            if(last == "title"){
              const res  = await fetch(`http://127.0.0.1:8000/animes/search?anime_name=${anime}&ascending=${ascTitle}&page=${page}&size=10`, requestOption);
              if(!res.status == 201){
                console.log('error')
              }
              const data = await res.json()
              setTableData(data.items)
            }else if(last == "score"){
              const res  = await fetch(`http://127.0.0.1:8000/animes/search/rating/?anime_name=${anime}&ascending=${ascScore}&page=${page}&size=10`, requestOption);
              if(!res.status == 201){
                console.log('error')
              }
              const data = await res.json()
              setTableData(data.items)
            }else if(last == "genres"){
              const res  = await fetch(`http://127.0.0.1:8000/animes/search/genres/?anime_name=${anime}&ascending=${ascGenres}&page=${page}&size=10`, requestOption);
              if(!res.status == 201){
                console.log('error')
              }
              const data = await res.json()
              setTableData(data.items)
            }else{
              const res  = await fetch(`http://127.0.0.1:8000/animes/search/type/?anime_name=${anime}&ascending=${ascType}&page=${page}&size=10`, requestOption);
              if(!res.status == 201){
                console.log('error')
              }
              const data = await res.json()
              setTableData(data.items)
            }
            
        }
        name()
        
    }, [page, ascGenres, ascScore, ascTitle, ascType])

    const getReviews = async () =>{
      const requestOption = {
        method: "GET",
        RequestMode:'no-cors',
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }
    const res  = await fetch(`http://localhost:8000/reviews/anime?for_anime=${focused.name}`, requestOption);
    console.log(focused.name)
      if(res.status != 200){
        setRevs("no reviews yet")
      }else{
        const data = await res.json()
        console.log(data)
        setRevs(data[0].comment)
      }
    }
    

  return (
    <>
    <HeaderCustom/>
      <InputGroup borderRadius={5} size="sm" marginTop={5} marginLeft={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input type="text" placeholder="Search..." border="1px solid #949494" value={anime} onChange={(e)=>setAnime(e.target.value)} >
        </Input>
        <InputRightAddon
          p={0}
          border="none"
          marginRight={10}
        >
          <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494" onClick={searchAnime}>
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
      <TableContainer>
        <Table variant='striped' colorScheme='teal' __css={{'table-layout': 'fixed', width: 'full'}}>
          <Thead>
            <Tr>
              <Th onClick={()=>{setLast("title");setAscTitle(!ascTitle);}}>Title</Th>
              <Th onClick={()=>{setLast("score");setAscScore(!ascScore);}}>score</Th>
              <Th onClick={()=>{setLast("genres");setAscGenres(!ascGenres);}}>genres</Th>
              <Th onClick={()=>{setLast("type");setAscType(!ascType);}}>type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.length > 0 && tableData.map((item =>
            <Tr key={item.name}>
              <Td>{item.name.length>25 ? `${item.name.slice(0,25)}...` : item.name}</Td>
              <Td>{item.score}</Td>
              <Td>{item.genres}</Td>
              <Td>{item.type}</Td>
              <Td>
                <Button onClick={()=>{onEditOpen();setFocused(item);}}>Info</Button>
                <Modal isOpen={isEditOpen} onClose={()=>{onEditClose();setRevs("no reviews")}}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Info</ModalHeader>
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
                        <FormLabel>Name</FormLabel>
                          <InputGroup>
                            <Input
                            value={focused.name}
                            disabled
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Score</FormLabel>
                          <InputGroup>
                            <Input
                            value={focused.score}
                            disabled
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Genre</FormLabel>
                          <InputGroup>
                            <Input
                            value={focused.genres}
                            disabled
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Type</FormLabel>
                          <InputGroup>
                            <Input
                            value={focused.type}
                            disabled
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Latest Review</FormLabel>
                          <InputGroup>
                            <Input
                            value={revw}
                            disabled
                            />
                          </InputGroup>
                        </FormControl>
                      </Stack>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={()=>{onEditClose();setRevs("no reviews")}}>
                        Cancel
                      </Button>
                      <Button variant='ghost' onClick={()=> {getReviews()}}>Get Latest Review</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Td>
            </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
        <InputGroup style={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={()=>{page > 1 && setPage(page-1)}}>
              Back
          </Button>
          <Text marginLeft={10} marginRight={10} marginTop={2}>
              {page}
          </Text>
          <Button onClick={()=>{setPage(page+1);}}>
              Next
          </Button>
        </InputGroup>
        <InputGroup style={{display: 'flex', justifyContent: 'center'}}> 
        {page > 1 && <Button onClick={()=>{setPage(1)}}>First</Button>}
        </InputGroup>
    </>
  );
};
