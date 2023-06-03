import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Text } from "@chakra-ui/react";
import MusicRecomendation from "../components/MusicRecomendation";
import { useSelector } from "react-redux";


const MusicPage = () => {
  const [music, setMusic] = useState([]);
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
    <Container maxW="100%" height="100vh" backgroundColor="#FFFFFF">
      <Box mt={8}>
        <MusicRecomendation music={music} />
      </Box>
      
    </Container>
  );
};

export default MusicPage;
