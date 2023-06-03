//@ts-check
import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiLibrary, BiHomeCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Box width="100%">
      <HStack
        gap="0px"
        width="inherit"
        bgColor="#06283D"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="20px"
      >
        <Button
          bgColor="transparent"
          color="#DFF6FF"
          size="lg"
          _hover={{ opacity: "0.2" }}
          leftIcon={<BiHomeCircle />}
        >
        <NavLink to='/dashboard'>Home</NavLink>
        </Button>
        <Button
          bgColor="transparent"
          color="#DFF6FF"
          size="lg"
          _hover={{ opacity: "0.2" }}
          leftIcon={<BiLibrary />}
        >
          <NavLink to='/library'>Library</NavLink>
        </Button>
        <Button
          bgColor="transparent"
          color="#DFF6FF"
          size="lg"
          _hover={{ opacity: "0.2" }}
        >
          Icon
        </Button>
        <Button
          bgColor="transparent"
          color="#DFF6FF"
          size="lg"
          _hover={{ opacity: "0.2" }}
          leftIcon={<AiOutlineCloudUpload />}
        >
          <NavLink to="/upload">Upload</NavLink>
        </Button>
        <Button
          bgColor="transparent"
          color="#DFF6FF"
          size="lg"
          _hover={{ opacity: "0.2" }}
          leftIcon={<CgProfile />}
        >
          Profile
        </Button>
      </HStack>
    </Box>
  );
};

export default Header;
