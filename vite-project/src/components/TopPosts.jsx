import React from 'react'
import { SimpleGrid, Card, CardBody, CardFooter, Text, Heading, Button, CardHeader } from '@chakra-ui/react'

export const TopPosts = ({tableData}) => {
  return (
    <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' style={{display: 'flex', justifyContent: 'space-evenly'}}>
          
        {tableData !== null && tableData.slice(0, 7).map((item) => (
            <Card className="link pop-on-hover" key={item.title} size={'md'} style={{flex: '1 1 0'}}>
            <CardHeader size='l'>
              <Heading size='md' > {`${item.title.slice(0,35)}...`}</Heading>
            </CardHeader>
            <CardBody>
              <Text>Upvote ratio: {item.upvote_ratio}</Text>
              <Text>Upvotes: {item.ups}</Text>
            </CardBody>
            <CardFooter>
              <a target='_blank'
            rel='noopener noreferrer' href={`https://www.reddit.com/${item.permalink}`}>
              <Button>View here</Button>
              </a>
            </CardFooter>
          </Card>
            
            
        ))}
       </SimpleGrid>
  )
}
