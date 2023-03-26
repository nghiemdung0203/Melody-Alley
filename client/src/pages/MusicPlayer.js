import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiPause, HiPlay } from "react-icons/hi";
import { FaRandom } from "react-icons/fa";
import { RxLoop } from "react-icons/rx";
import { MdGraphicEq } from "react-icons/md";
import { BsVolumeDownFill } from "react-icons/bs";
import { PlayPause, PreviousSong, NextSong } from "../features/musicSlice";

const MusicPlayer = ({ MusicTrack }) => {
  const currentTrackIndex = useSelector(
    (state) => state.music.CurrentTrackIndex
  );
  const isPlaying = useSelector((state) => state.music.isPlaying);

  const dispatch = useDispatch();

  const [sliderValue, setSliderValue] = useState(0);
  const audioRef = useRef();

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progressPercentage = (currentTime / duration) * 100;
    setSliderValue(progressPercentage);
  };

  const handleSliderChange = (value) => {
    const duration = audioRef.current.duration;
    const currentTime = (value / 100) * duration;
    audioRef.current.currentTime = currentTime;
    setSliderValue(value);
  };

  const PlayAndPause = () => {
    if (isPlaying) {
      dispatch(PlayPause(isPlaying));
      audioRef.current.play();
    } else {
      dispatch(PlayPause(isPlaying));
      audioRef.current.pause();
    }
  };

  const goToNext = () => {
    if (currentTrackIndex === MusicTrack.length - 1) {
      audioRef.current.currentTime = 0;
    } else {
      dispatch(NextSong());
    }
  };

  const gotoPrevious = () => {
    if (currentTrackIndex === 0) {
      audioRef.current.currentTime = 0
    } else {
      dispatch(PreviousSong());
    }
  };

  return (
    <Box width="inherit" display="flex" flexDirection="row" bgColor={"#06283D"}>
      <Box
        id="button"
        display="flex"
        flexDirection="row"
        alignItems="center"
        padding="5px 5px 0"
      >
        <Button
          backgroundColor="transparent"
          borderRadius="60%"
          _hover={{ bgColor: "none", cursor: "pointer" }}
          onClick={gotoPrevious}
        >
          <AiFillStepBackward color="#DFF6FF" size={20} />
        </Button>
        <Button
          backgroundColor="transparent"
          borderRadius="60%"
          _hover={{ bgColor: "none", cursor: "pointer" }}
          onClick={PlayAndPause}
        >
          {isPlaying ? (
            <HiPlay color="#DFF6FF" size={20} />
          ) : (
            <HiPause color="#DFF6FF" size={20} />
          )}
        </Button>
        <Button
          backgroundColor="transparent"
          borderRadius="60%"
          _hover={{ bgColor: "none", cursor: "pointer" }}
          onClick={goToNext}
        >
          <AiFillStepForward color="#DFF6FF" size={20} />
        </Button>
        <Button
          backgroundColor="transparent"
          borderRadius="60%"
          _hover={{ bgColor: "none", cursor: "pointer" }}
        >
          <FaRandom color="#DFF6FF" size={20} />
        </Button>
        <Button
          backgroundColor="transparent"
          borderRadius="60%"
          _hover={{ bgColor: "none", cursor: "pointer" }}
        >
          <RxLoop color="#DFF6FF" size={20} />
        </Button>
        <Button
          backgroundColor="transparent"
          borderRadius="60%"
          _hover={{ bgColor: "none" }}
        >
          <BsVolumeDownFill color="#DFF6FF" size={20} />
        </Button>
      </Box>
      <Box id="audio">
        <audio
          src={MusicTrack[currentTrackIndex].secure_url}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          autoPlay
        ></audio>
      </Box>
      <Box id="slider" display="flex" justifyItems="center" width="100%">
        <Slider
          aria-label="slider-ex-4"
          defaultValue={0}
          value={sliderValue}
          onChange={handleSliderChange}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
      </Box>
      <Box id="inform" padding="5px 8px 0" width='200px' marginLeft="10px">
        <Text color={"#DFF6FF"} overflow= "hidden" whiteSpace= "nowrap" textOverflow= "ellipsis">{MusicTrack[currentTrackIndex].public_id}</Text>
      </Box> 
      <Box id="volumn"></Box>
    </Box>
  );
};

export default MusicPlayer;
