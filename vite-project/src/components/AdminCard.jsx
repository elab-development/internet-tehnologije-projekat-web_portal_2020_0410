import React from 'react'
import { Card, CardHeader, Text, Heading, CardBody, Box, Stack, StackDivider } from '@chakra-ui/react'
import { Quote } from './Quote'

export const AdminCard = ({data}) => {
  return (
    <>
    {data !== null &&
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
            {data.username}
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Email
          </Heading>
          <Text pt='2' fontSize='sm'>
            {data.email}
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Description
          </Heading>
          <Text pt='2' fontSize='sm'>
            {data.description}
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
  </Card>}
  </>
  )
}
