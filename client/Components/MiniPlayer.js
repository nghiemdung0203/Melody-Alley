import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Slider from '@react-native-community/slider'
import TrackPlayer, { State, useProgress } from 'react-native-track-player'

const { width } = Dimensions.get('window')
const MiniPlayer = ({ currentSong }) => {
  const progress = useProgress();



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
    <View style={{
      width: width,
      backgroundColor: '#fff',
      position: 'absolute',
      bottom: 70,
      left: 0,
      right: 0
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -5, // Adjust this value to move the slider closer to miniPlayerContainer
        paddingHorizontal: 10 // Add padding if needed
      }}>
        <Slider
          style={{ flex: 1 }}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor='transparent'
          minimumTrackTintColor="#FFD369"
          maximumTrackTintColor="#ccc"
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>
      <View style={styles.miniPlayerContainer}>
        <View style={styles.InfoTrack}>
          <Image source={{ uri: currentSong.Thumbnail }} style={{
            width: 65,
            height: 65,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
          }} />
          <View style={{
            flexDirection: 'column',
            maxWidth: '50%',
            justifyContent: 'center',
            marginLeft: 15
          }}>
            <Text style={styles.titleSong} numberOfLines={1} ellipsizeMode='tail'>
              {currentSong.titleSong}
            </Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.AuthorSong}>
              {currentSong.AuthorID}
            </Text>
          </View>
          <TouchableOpacity style={{
            marginLeft: 30,
            alignSelf: 'center'
          }} onPress={togglePlayBack}>
            <Fontisto name="play" size={30} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



export default MiniPlayer

const styles = StyleSheet.create({
  miniPlayerContainer: {
    width: width * 0.9,

    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    justifyContent: 'space-between'
  },
  InfoTrack: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignSelf: 'flex-start',
  },
  titleSong: {
    fontSize: 16,
    fontWeight: '600'
  },
  AuthorSong: {
    fontSize: 14,
    fontWeight: '400'
  },

})