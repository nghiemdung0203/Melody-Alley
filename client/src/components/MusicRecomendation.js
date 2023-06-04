import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { currentSong } from "../features/musicSlice";
import { setSongs } from "../features/musicSlice";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdPlaylistAdd } from "react-icons/md";
import "../Style/MR.css";

const MusicRecomendation = ({ music }) => {
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleGetMusic = async (titleSong) => {
    await axios
      .get(
        `http://localhost:5002/api/song/SpecSong?titleSong=${titleSong}`,
        config
      )
      .then((res) => {
        console.log(res);
        dispatch(setSongs(res.data));
      });
  };

  const likeSong = async (song_id) => {
    const User = localStorage.getItem("user");
    const User_id = JSON.parse(User).id;

    await axios
      .post(
        "http://localhost:5002/api/LikedSong/LikedSong",
        {
          'UserID': User_id,
          'SongID': song_id,
        }, config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Box maxW="60%">
      <Box>
        <Text
          fontSize={"2xl"}
          marginBottom={"5px"}
          marginLeft={"13px"}
          fontFamily={"sans-serif"}
        >
          You've uploaded
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap="10px"
          width="100%"
        >
          {music.map((song) => (
            <Card
              key={song._id}
              width="200px"
              margin="10px"
              height={{ base: "200px", md: "250px" }}
              display="flex"
              justifyContent="center"
              backgroundColor="transparent"
            >
              <CardHeader>
                <Flex
                  className="image-container"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    src={song.Thumbnail}
                    placeholder="Thumbnail"
                    boxSize="150px"
                    borderRadius="15px"
                  />
                  <Flex className="button-container">
                    <Button
                      className="like-button"
                      onClick={() => {
                        likeSong(song._id);
                      }}
                    >
                      <FcLikePlaceholder />
                    </Button>
                    <Button className="add-to-playlist-button">
                      <MdPlaylistAdd />
                    </Button>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody mt={-2} onClick={() => handleGetMusic(song.titleSong)}>
                <Text
                  alignContent="center"
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  textColor="#1B9C85"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  cursor={"pointer"}
                >
                  {song.titleSong}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MusicRecomendation;
