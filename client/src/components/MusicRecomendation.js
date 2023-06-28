import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
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
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Pagination, Navigation, Virtual } from "swiper";

const MusicRecomendation = ({ music }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleGetMusic = async (song_id) => {
    await axios
      .get(
        `http://localhost:5002/api/song/SpecSong?SongId=${song_id}`,
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
          UserID: User_id,
          SongID: song_id,
        },
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleToSongPage = (song_id) => {
    navigate(`/Song/${encodeURIComponent(song_id)}`);
  };
  return (
    <Box maxW="75%">
      <Box>
        <Text
          fontSize={"2xl"}
          marginBottom={"5px"}
          marginLeft={"13px"}
          fontFamily={"sans-serif"}
        >
          You've uploaded
        </Text>
        <Flex
          className="uploaded-swiper"
          position={'relative'}
          left='5%'
          maxW={'inherit'}
        >
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => {
              console("slide changed");
            }}
            onSwiper={() => {
              console.log("swiper");
            }}
          >
            {music.map((song) => (
              <SwiperSlide key={song._id}>
                <Card
                  key={song._id}
                  width="200px"
                  margin="10px"
                  height={{ base: "200px", md: "250px" }}
                  display="flex"
                  justifyContent="center"
                  backgroundColor="transparent"
                  className="card-container"
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
                        onClick={() => handleToSongPage(song._id)}
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
                  <CardBody
                    mt={-2}
                    onClick={() => handleGetMusic(song._id)}
                  >
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
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Box>
    </Box>
  );
};

export default MusicRecomendation;
