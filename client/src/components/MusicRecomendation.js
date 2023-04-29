import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
  const MusicTrack = useSelector((state) => state.music.MusicTrack);
  const dispatch = useDispatch();

  const handleGetMusic = async (titleSong) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
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

  const likeSong = () => {

  }

  useEffect(() => {
    console.log(typeof MusicTrack);
  }, []);
  return (
    <Box maxW='inherit'>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
        gap="10px"
        borderRadius="20px"
        bgColor="#06283D"
        width="100%"
      >
        {music.map((song) => (
          <Card
            key={song._id}
            width="200px"
            margin="10px"
            height={{ base: "400px", md: "300px" }}
            display="flex"
            justifyContent="center"
            onClick={() => handleGetMusic(song.titleSong)}
            backgroundColor="transparent"
          >
            <CardHeader>
              <Box className="image-container">
                <Image
                  src={song.Thumbnail}
                  placeholder="Thumbnail"
                  boxSize="200px"
                  borderRadius="15px"
                />
                <Box className="button-container">
                  <Button class="like-button">
                    <FcLikePlaceholder />
                  </Button>
                  <Button class="add-to-playlist-button">
                    <MdPlaylistAdd />
                  </Button>
                </Box>
              </Box>
            </CardHeader>
            <CardBody mt={-2}>
              <Text
                alignContent="center"
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                textColor="#DFF6FF"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {song.titleSong}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default MusicRecomendation;
