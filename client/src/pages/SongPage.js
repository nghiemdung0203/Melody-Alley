import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import { useParams } from 'react-router-dom'

const SongPage = () => {
  const {title} = useParams();
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
        <AudioPlayer title={title}/>
    </Flex>
  )
}

export default SongPage