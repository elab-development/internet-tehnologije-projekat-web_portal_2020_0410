import React from 'react'
import { Table, Tbody, Tr, Th, Thead, TableCaption, Td } from '@chakra-ui/react'

export const TableBestRated = ({bestRated}) => {
  return (
    <Table variant='striped' colorScheme='teal' marginRight={20}>
          <TableCaption>Top 5 best rated animes</TableCaption>
            <Thead>
                <Tr>
                <Th>Anime</Th>
                <Th>Rating</Th>
                </Tr>
            </Thead>
            <Tbody>
            {bestRated !== null && bestRated.map((item) =>
            <Tr key={item.anime}>
                <Td>{item.anime}</Td>
                <Td>{item.rating}</Td>
                </Tr>)}
            </Tbody>
        </Table>
  )
}
