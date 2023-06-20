import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { useParams } from "react-router-dom";
import RelatedTrack from "../components/RelatedTrack";
import Comment from "../components/Comment";

const SongPage = () => {
  const { title } = useParams();
  return (
    <Flex justifyContent="center" alignItems="center">
      <VStack>
        <AudioPlayer title={title} />
        <Flex flexDirection='row'>
          <RelatedTrack />
          <Comment/>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default SongPage;
