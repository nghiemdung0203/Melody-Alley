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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
<script src="http://localhost:8097"></script>;

const { width, heigh } = Dimensions.get('window');

const MusicPlayer = ({ songs, selectedSongIndex }) => {
  const playBackState = usePlaybackState();
  const [songIndex, setSongIndex] = useState(selectedSongIndex);
  const progress = useProgress();
  const [trackTitle, setTrackTitle] = useState(songs[selectedSongIndex]?.title || '');
  const [trackArtwork, setTrackArtwork] = useState(songs[selectedSongIndex]?.artwork || '');
  const [trackArtist, setTrackArtist] = useState(songs[selectedSongIndex]?.artist || '');

  const [isLoading, setIsLoading] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

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
  
  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSong = ({ item, index }) => {
    if (isLoading) {
      return null; // Return null or a placeholder component while loading
    }

    return (
      <Animated.View style={style.mainImageWrapper}>
        <View style={[style.imageWrapper, style.elevation]}>
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
            {/* Image */}
            <Animated.FlatList
              ref={songSlider}
              renderItem={renderSong}
              data={songs}
              keyExtractor={(item) => item._id}
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
                { useNativeDriver: true }
              )}
            />

            {/* Song content */}
            <View>
              <Text style={[style.songTitle, style.songContent]}>{trackTitle}</Text>
              <Text style={[style.songArtist, style.songContent]}>
                {trackArtist}
              </Text>
            </View>

            {/* Slider */}
            <View>
              <Slider
                style={style.progressBar}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor="#FFD369"
                minimumTrackTintColor="#FFD369"
                maximumTrackTintColor="#fff"
                onSlidingComplete={async (value) => {
                  await TrackPlayer.seekTo(value);
                }}
              />
              {/* Music Duration */}
              <View style={style.progressLevelDuration}>
                <Text style={style.progressLabelText}>
                  {new Date(progress.position * 1000)
                    .toLocaleTimeString()
                    .substring(3)
                    .split(' ')[0]}
                </Text>
                <Text style={style.progressLabelText}>
                  {new Date((progress.duration - progress.position) * 1000)
                    .toLocaleTimeString()
                    .substring(3)
                    .split(' ')[0]}
                </Text>
              </View>
            </View>

            {/* Music control */}
            <View style={style.musicControlsContainer}>
              <TouchableOpacity onPress={skipToPrevious}>
                <Ionicons
                  name="play-skip-back-outline"
                  size={35}
                  color="#FFD369"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  togglePlayBack(playBackState);
                }}
              >
                <Ionicons
                  name={
                    playBackState.state === State.Playing
                      ? 'pause-circle'
                      : 'play-circle'
                  }
                  size={70}
                  color="#FFD369"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={skipToNext}>
                <Ionicons
                  name="play-skip-forward-outline"
                  size={35}
                  color="#FFD369"
                />
              </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },



  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 20,
    marginTop: 20,
  },

  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },

  songTitle: {
    fontSize: 18,
    fontWeight: 600,
  },


  songContent: {
    textAlign: 'center',
    color: '#0f0f0f',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 20,
    flexDirection: 'row',
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#0f0f0f',
    fontWeight: '500',
  },
  musicControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 15,
  },
  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
