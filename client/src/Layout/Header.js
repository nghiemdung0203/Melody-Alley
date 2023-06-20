//@ts-check
import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiLibrary, BiHomeCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import '../Style/Header.css'
const Header = () => {
  return (
    <Box
      width="100%"
      display={"flex"}
      justifyContent={"space-around"}
      backgroundColor={"Transparent"}
      margin={"10px"}
      position={"relative"}
      right={"1%"}
    >
      <HStack
        gap="0px"
        maxWidth={"100%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position={"relative"}
        className="header-container"
      >
        <Button leftIcon={<BiHomeCircle />}>
          <NavLink to="/dashboard">Home</NavLink>
        </Button>
        <Button leftIcon={<BiLibrary />}>
          <NavLink to="/library">Library</NavLink>
        </Button>
        <Button>Icon</Button>
        <Button leftIcon={<AiOutlineCloudUpload />}>
          <NavLink to="/upload">Upload</NavLink>
        </Button>
        <Button leftIcon={<CgProfile />}>Profile</Button>
        <Box className="animation start-home"></Box>
      </HStack>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="https://via.placeholder.com/50"
          borderRadius="full"
          boxSize="50px"
          margin={"5px 10px"}
        />
        <Text fontSize={"2xl"} fontFamily={"sans-serif"}>
          Nghieem quoc Dung
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
