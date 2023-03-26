import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const toast = useToast()
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(file)
    formData.append("song", file)
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }
    
    try {
      const result = await axios.post('http://localhost:5002/api/song/createSong', formData, config)
      console.log(result);
      navigate('/dashboard');

    } catch(error) {
      toast({
        status: "error",
        description: error.message,
        duration: 3000,
        position: "bottom",
        isClosable: true
      })
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        border="1px solid black"
        borderRadius="10px"
        width="50%"
        height="50%"
      >
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <FormControl>
            <FormLabel
              htmlFor="mp3file"
              fontSize="3xl"
              fontWeight="medium"
              margin="10px"
              position="relative"
              left="10px"
            >
              Select an mp3 file:
            </FormLabel>
            <Input
              type="file"
              id="mp3file"
              name="mp3file"
              onChange={handleFileChange}
              padding="5px"
              margin="20px"
              accept="audio/*"
            />
          </FormControl>
          <Button
            type="submit"
            position="relative"
            left="20px"
            width="400px"
            colorScheme="orange"
          >
            Upload
          </Button>
        </form>
      </Flex>
    </Box>
  );
};

export default Upload;
