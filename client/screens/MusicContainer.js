import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import MusicPlayer from '../Components/MusicPlayer';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const MusicContainer = (props) => {
  const songsArray = useSelector((state) => state.music.songsArray);
  
  // Use useRoute hook to access route params
  const route = useRoute();

  // Check if SongID exists in route params or props
  const SongID = route.params?.SongID ?? props.route?.params?.SongID ?? 0;

  return (
    <View style={style.container}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer songs={songsArray} selectedSongIndex={SongID} />
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