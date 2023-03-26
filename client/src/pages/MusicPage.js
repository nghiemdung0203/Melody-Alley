import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import MusicRecomendation from "../components/MusicRecomendation";
import { useSelector } from "react-redux";
import MusicPlayer from "./MusicPlayer";
import "../Style/MusicPage.css";

const MusicPage = () => {
  const [music, setMusic] = useState([]);
  const MusicTrack = useSelector((state) => state.music.MusicTrack);
  const fetchMusic = async () => {
    const res = await axios
      .get("http://localhost:5002/api/song/songs")
      .then((result) => {
        setMusic(result.data);
      });
  };

  useEffect(() => {
    fetchMusic();
  }, []);
  return (
    <Container maxW="100%" height="100vh" backgroundColor="#47B5FF">
      <Box maxW="6xl">
        <Header />
      </Box>
      <Box mt={8} maxW="6xl">
        <MusicRecomendation music={music} />
      </Box>
      <Box id="musicPlayer">
        {MusicTrack.length > 0 ? <MusicPlayer MusicTrack={MusicTrack} /> : null}
      </Box>
    </Container>
  );
};

export default MusicPage;
