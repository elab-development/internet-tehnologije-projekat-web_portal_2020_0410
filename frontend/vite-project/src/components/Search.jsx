import React, { ReactElement, ReactNode, useState, useContext, useEffect } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
  } from "@chakra-ui/icons";
import { Search2Icon } from "@chakra-ui/icons";
import HeaderCustom from "./HeaderCustom";
import { UserContext } from "../context/UserContext";
import { useTable, usePagination } from "react-table";


export const Search = () => {
    const [anime, setAnime] = useState("")
    const [token,] = useContext(UserContext)
    const [page, setPage] = useState(1)
    const [tableData, setTableData] = useState([])
    
    const searchAnime = async () =>{
        const requestOption = {
          method: "GET",
          RequestMode:'no-cors',
          headers:{
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
      }
      const res  = await fetch(`http://127.0.0.1:8000/animes/search?anime_name=${anime}&page=${page}&size=10`, requestOption);
      if(!res.status == 201){
        console.log('error')
      }
      console.log(res)
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
            const res  = await fetch(`http://127.0.0.1:8000/animes/search?anime_name=${anime}&page=${page}&size=10`, requestOption);
            if(!res.status == 201){
              console.log('error')
            }
            console.log(res)
            const data = await res.json()
            setTableData(data.items)
        }
        name()
        
    }, [page])


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
              <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>score</Th>
                  <Th>genres</Th>
                  <Th>type</Th>
                </Tr>
            </Thead>
            <Tbody>
              {tableData.length > 0 && tableData.map((item =>
              <Tr>
                <Td>{item.name}</Td>
                <Td>{item.score}</Td>
                <Td>{item.genres}</Td>
                <Td>{item.type}</Td>
              </Tr>
              
              ))}
              </Tbody>
            </Table>
          </TableContainer>
          <InputGroup>
            <Button onClick={()=>{page > 1 && setPage(page-1)}}>
                Back
            </Button>
            <Text>
                {page}
            </Text>
            <Button onClick={()=>{setPage(page+1);}}>
                Next
            </Button>
          </InputGroup> 
    </>
  );
};
