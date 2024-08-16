import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import MusicPlayer from '../Components/MusicPlayer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MusicContainer = ({ route }) => {
  const songsArray = useSelector((state) => state.music.songsArray)
  const selectedSongIndex = useSelector((state) => state.music.selectedSongIndex)

  return (
    <View style={style.container}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer songs={songsArray}  selectedSongIndex={selectedSongIndex}/>
    </View>
  );
};

export default MusicContainer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
