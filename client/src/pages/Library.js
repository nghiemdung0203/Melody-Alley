import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdPlaylistAdd, MdViewList, MdViewModule } from "react-icons/md";
import axios from "axios";
import {fetchLikedTrack} from '../features/LikedSong';
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../features/musicSlice";
import { FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const User = localStorage.getItem("user");
const User_id = JSON.parse(User).id;

const Library = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MusicLikedTrack = useSelector((state) => state.LikedSong.MusicLikedTrack);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchLikedSong = async () => { // nạp like song vào MusicLikedTrack;

    await axios
      .post(
        "http://localhost:5002/api/LikedSong/getLikedSong",
        {
          UserID: User_id,
        },
        config
      )
      .then((res) => {
        dispatch(fetchLikedTrack(res.data))
        console.log(MusicLikedTrack);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLikedSong(); 
  }, [User_id, MusicLikedTrack]);

  //huy like song
  const disLikedsong = async (song_id) => {
    const User = localStorage.getItem("user");
    const User_id = JSON.parse(User).id;

    await axios
      .post(
        "http://localhost:5002/api/LikedSong/disLikeSong",
        {
          'UserID': User_id,
          'SongID': song_id,
        }, config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleGetMusic = async (song_id) => { // bật bài hát
    await axios
      .get(
        `http://localhost:5002/api/song/SpecSong?SongId=${song_id}`,
        config
      )
      .then((res) => {
        console.log(res);
        dispatch(setSongs(res.data)); // cần sửa để set song các bài hát được được like
      });
  };

  const handleToSongPage = () => {
    navigate('/Song');
  }
  return (
    <Flex
      maxW={{ base: "50%", md: "60%", lg: "70%" }}
      justifyContent="center"
      alignItems={'center'}
      marginLeft={'18%'}
      flexDirection={'column'}
    >
      <HStack
        flexDirection={'row'}
        margin={"20px"}
        display="flex"
        justifyContent={"space-between"}
        width={{ base: "90%", md: "100%" }}
      >
        <Text fontSize="2xl" textAlign={"justify"}>
          Songs that you've liked
        </Text>
        <Flex
          direction={"row"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
          alignSelf={'end'}
        >
          <Text>View</Text>
          <Button>
            <MdViewList />
          </Button>
          <Button>
            <MdViewModule />
          </Button>
        </Flex>
      </HStack>
      <Flex>
      <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap="10px"
          width="100%"
        >
          {MusicLikedTrack.map((song) => (
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
                    onClick={handleToSongPage}
                  />
                  <Flex className="button-container">
                    <Button
                      className="like-button"
                      onClick={() => {
                        disLikedsong(song._id);
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
              <CardBody mt={-2} onClick={() => handleGetMusic(song._id)}>
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
      </Flex>
    </Flex>
  );
};

export default Library;
