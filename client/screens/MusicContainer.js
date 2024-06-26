import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import MusicPlayer from './MusicPlayer';
import axios from 'axios';

const MusicContainer = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        await axios
          .post('http://10.0.2.2:5002/song/songs', {
            Author_Id: '63e5011179be5a80f8a5d2d7',
          })
          .then(response => {
            setSongs(response.data);
            setIsLoading(false);
          });
      } catch (error) {
        console.error('Error posting data:', error);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <View style={style.container}>
      <StatusBar barStyle="light-content" />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : songs.length > 0 ? (
        <MusicPlayer songs={songs} />
      ) : (
        <Text>No songs found</Text>
      )}
    </View>
  );
};

export default MusicContainer;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
