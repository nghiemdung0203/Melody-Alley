import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { MdViewList, MdViewModule } from 'react-icons/md'

const Library = () => {
  return (
    <Flex direction={['column', 'row']} maxW={{base: '50%', md: '80%', lg: '100%'}}  justifyContent='center' alignItems={['center', 'flex-start']}>
        <HStack margin={'20px'} display='flex' justifyContent={'space-between'} width={{base: '90%', md: '100%'}}>
            <Text fontSize='2xl' textAlign={'justify'}>Songs that you've liked</Text>
            <Flex direction={'row'} gap={2} justifyContent={'center'} alignItems={'center'} >
                <Text>View</Text>
                <Button><MdViewList/></Button>
                <Button><MdViewModule/></Button>
            </Flex>
        </HStack>
        <Flex>
          
        </Flex>
    </Flex>
  )
}

export default Library