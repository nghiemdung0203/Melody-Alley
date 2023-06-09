import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

const AudioPlayer = ({ title }) => {
  const [Song, setSong] = useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/song/SpecSong?titleSong=${title}`,
          config
        );
        setSong(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSong();
  }, [title]);

  return (
    <Flex id="player" margin={"4"}>
      <Box id="thumbnail" display={"inline"}>
        <Image
          src={Song.Thumbnail}
          boxSize={300}
          placeholder="Song's Thumbnail"
          objectFit="cover"
          borderRadius={'20px'}
        />
      </Box>
      <Box id="tag-info" marginLeft={4}>
        <Text
          fontSize={"3xl"}
          fontFamily={"sans-serif"}
          whiteSpace={"nowrap"}
          color={"#1B9C85"}
        >
          {Song.titleSong}
        </Text>
        <Box>
          <Button
            leftIcon={<BsFillPlayFill />}
            borderRadius={"25px"}
            backgroundColor={"#87CBB9"}
            margin={"2.5"}
            width={"110px"}
            height={"45px"}
          >
            <Text fontSize={"2md"} fontFamily={"sans-serif"}>
              Play
            </Text>
          </Button>
          <Button borderRadius={"100px"} backgroundColor={"#05BFDB"}>
            <AiOutlineHeart />
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default AudioPlayer;
