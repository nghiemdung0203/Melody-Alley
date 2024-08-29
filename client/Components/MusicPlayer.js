import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Animated,
  requireNativeComponent,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';


<script src="http://localhost:8097"></script>;

const { width, heigh } = Dimensions.get('window');

const MusicPlayer = ({ songs, selectedSongIndex }) => {
  const playBackState = usePlaybackState();
  const [songIndex, setSongIndex] = useState(selectedSongIndex);
  const progress = useProgress();
  const [trackTitle, setTrackTitle] = useState(songs[selectedSongIndex]?.title || '');
  const [trackArtwork, setTrackArtwork] = useState(songs[selectedSongIndex]?.artwork || '');
  const [trackArtist, setTrackArtist] = useState(songs[selectedSongIndex]?.artist || '');
  const [repeatMode, setRepeatMode] = useState('off');

  const [speed, setSpeed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const navigation = useNavigation()
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


  const repeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    }

    if (repeatMode === 'track') {
      return 'repeat-once';
    }

    if (repeatMode === 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode === 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const setUpPlayers = async (songs) => {
    try {
      const isPlayerInitialized = await TrackPlayer.isServiceRunning();
      if (!isPlayerInitialized) {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
      }

      await TrackPlayer.reset(); // Reset any existing queue
      await TrackPlayer.add(songs);
      await TrackPlayer.skip(selectedSongIndex);
      await TrackPlayer.play();
    } catch (e) {
      console.log(e);
    }
  };


  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      try {
        const track = await TrackPlayer.getTrack(event.nextTrack);

        const { titleSong, Thumbnail, AuthorID } = track;
        setTrackTitle(titleSong);
        setTrackArtist(AuthorID);
        setTrackArtwork(Thumbnail);
      } catch (error) {
        console.log('Error fetching track data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    const setUpPlayerAndScroll = async () => {
      await setUpPlayers(songs); // Set up the player with the song list

      // Skip to the selected song after the player is set up
      if (selectedSongIndex !== songIndex) {
        await TrackPlayer.skip(selectedSongIndex); // Ensure we're on the correct song
        setSongIndex(selectedSongIndex); // Update the local songIndex state
      }

      // Scroll to the selected song
      if (songSlider.current) {
        songSlider.current.scrollToOffset({
          offset: selectedSongIndex * width,
          animated: false,
        });
      }
    };

    setUpPlayerAndScroll(); // Call the function to set up the player and scroll

    // Clean up scroll listener on component unmount
    return () => {
      scrollX.removeAllListeners();
    };
  }, [selectedSongIndex]);

  const skipToNext = async () => {
    const nextIndex = songIndex + 1;
    if (nextIndex < songs.length) {
      await TrackPlayer.skip(nextIndex); // Skip to the next track in TrackPlayer
      setSongIndex(nextIndex); // Update songIndex state

      // Scroll to the next song in the FlatList
      songSlider.current.scrollToOffset({
        offset: nextIndex * width,
      });
    }
  };

  const skipToPrevious = async () => {
    const previousIndex = songIndex - 1;
    if (previousIndex >= 0) {
      await TrackPlayer.skip(previousIndex); // Skip to the previous track in TrackPlayer
      setSongIndex(previousIndex); // Update songIndex state

      // Scroll to the previous song in the FlatList
      songSlider.current.scrollToOffset({
        offset: previousIndex * width,
      });
    }
  };

  const goBack = () => {
    navigation.goBack();
  }


  const renderSong = ({ item, index }) => {
    if (isLoading) {
      return null; // Return null or a placeholder component while loading
    }

    return (
      <Animated.View style={style.songImage} >
        <View style={style.imageWrapper}>
          <Image source={{ uri: `${trackArtwork}` }} style={style.musicImage} />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {isLoading ? (
        <View style={style.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={style.maincontainer}>
            {/**Header */}
            <View style={style.HeaderContainer}>
              <TouchableOpacity onPress={goBack}> 
                <Feather name="chevron-down" size={30} color="#333" />
              </TouchableOpacity>
              <View style={{
                flexDirection: 'row',
                gap: 10
              }}>
                <MaterialCommunityIcons name="broadcast" size={30} color="#333" />
                <Text style={style.textHeader}>Broadcast</Text>
              </View>
              <Feather name="more-vertical" size={30} color="#333" />
            </View>

            {/**Body */}

            <View style={style.bodyContainer}>
              <Animated.FlatList
                ref={songSlider}
                renderItem={renderSong}
                data={songs}
                keyExtractor={item => item._id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {
                          x: scrollX,
                        },
                      },
                    },
                  ],
                  { useNativeDriver: true },
                )}
              />
              <View style={style.songInfo}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: '#333'
                }} numberOfLines={1} ellipsizeMode='tail'>{trackTitle}</Text>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#6e6e6e'
                }} numberOfLines={1} ellipsizeMode='tail'>{trackArtist}</Text>
              </View>

              <View style={style.sliderContainer}>
                <Slider
                  value={progress.position}
                  minimumValue={0}
                  maximumValue={progress.duration}
                  thumbTintColor="#fd0a06"
                  minimumTrackTintColor="#333"
                  maximumTrackTintColor='#888886'
                  onSlidingComplete={async (value) => {
                    await TrackPlayer.seekTo(value);
                  }}
                />
                <View style={style.MusiDuration}>
                  <Text style={style.progressLabelText}>{new Date(progress.position * 1000)
                    .toLocaleTimeString()
                    .substring(3)
                    .split(' ')[0]}</Text>
                  <Text style={style.progressLabelText}>{new Date((progress.duration - progress.position) * 1000)
                    .toLocaleTimeString()
                    .substring(3)
                    .split(' ')[0]}</Text>
                </View>

                <View style={style.MusicControl}>
                  <TouchableOpacity>
                    <FontAwesome name="random" size={30} color="#333" />
                  </TouchableOpacity>

                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                  }}>
                    <TouchableOpacity onPress={skipToPrevious}>
                      <FontAwesome6 name='backward-step' size={30} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { togglePlayBack(playBackState) }}>
                      <MaterialCommunityIcons name={
                        playBackState.state === State.Playing
                          ? 'pause-circle'
                          : 'play-circle'
                      } size={100} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipToNext}>
                      <FontAwesome6 name='forward-step' size={30} color="#333" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={changeRepeatMode}>
                    <MaterialCommunityIcons
                      name={`${repeatIcon()}`}
                      size={30}
                      color={repeatMode !== 'off' ? '#fd0a06' : '#888888'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 30
                }}>
                  <TouchableOpacity style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    padding: 15,
                    borderRadius: 30
                  }}>
                    <FontAwesome6 name="headphones" size={25} color="#fd0a06" />
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#333'
                    }}>Headphones</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name="share-2" size={25} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  maincontainer: {
    flex: 1,
    position: 'relative'
  },
  HeaderContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    padding: 15
  },
  textHeader: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    alignSelf: 'center'
  },
  bodyContainer: {
    flexDirection: 'column',
    width: width,
    alignItems: 'center',
    gap: 50
  },
  songImage: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  songInfo: {
    alignSelf: "flex-start",
    marginLeft: 35,
    gap: 5
  },
  sliderContainer: {
    width: width * 0.85,
    marginTop: -30
  },
  MusiDuration: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressLabelText: {
    color: '#767676',
    fontWeight: '700'
  },
  MusicControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  imageWrapper: {
    width: '85%',
    aspectRatio: 1,
    marginTop: 20,
    backgroundColor: 'white', // Add this
    borderRadius: 30, // Add this
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // for Android
    
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden'
  }
});
