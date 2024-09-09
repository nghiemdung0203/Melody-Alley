import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Slider from '@react-native-community/slider'
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player'

const { width } = Dimensions.get('window')
const MiniPlayer = ({ currentSong }) => {
  const progress = useProgress();
  const playBackState = usePlaybackState();

  const togglePlayBack = async (playBackState) => {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack != null) {
        if (playBackState.state === State.Playing) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor='#fd0a06'
          minimumTrackTintColor="#333"
          maximumTrackTintColor='#888886'
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>
      <View style={styles.miniPlayerContainer}>
        <View style={styles.InfoTrack}>
          <Image source={{ uri: currentSong.Thumbnail }} style={styles.thumbnail} />
          <View style={styles.songInfo}>
            <Text style={styles.titleSong} numberOfLines={1} ellipsizeMode='tail'>
              {currentSong.titleSong}
            </Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.AuthorSong}>
              {currentSong.AuthorID}
            </Text>
          </View>
          <TouchableOpacity style={styles.playButton} onPress={() => { togglePlayBack(playBackState) }}>
            <FontAwesome6 name={
              playBackState.state === State.Playing
                ? 'pause'
                : 'play'
            } size={30} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MiniPlayer

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 88,
    left: 0,
    right: 0,
    borderWidth: 0.5,
    borderColor: 'gray'
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 0,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  miniPlayerContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  InfoTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  thumbnail: {
    width: 65,
    height: 65,
  },
  songInfo: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 15,
  },
  titleSong: {
    fontSize: 16,
    fontWeight: '600'
  },
  AuthorSong: {
    fontSize: 14,
    fontWeight: '400'
  },
  playButton: {
    padding: 10,
  }
})