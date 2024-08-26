import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'

const { width } = Dimensions.get('window')
const MiniPlayer = ({ currentSong }) => {
  console.log(currentSong)
  return (
    <View style={{
      width: width,
      backgroundColor: '#fff',
      position: 'absolute',
      bottom: 70,
      left: 0,
      right: 0
    }}>
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
          <Fontisto name="play" size={30} style={styles.playButton} color='black' />
        </View>
      </View>
    </View>
  )
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
  playButton: {
    marginLeft: 30,
    alignSelf: 'center'
  }
})