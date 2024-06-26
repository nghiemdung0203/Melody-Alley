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
import React, {useEffect, useRef, useState} from 'react';
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

const {width, heigh} = Dimensions.get('window');

const MusicPlayer = ({songs}) => {
  const playBackState = usePlaybackState();
  const [songIndex, setSongIndex] = useState(0);
  const progress = useProgress();
  const [trackTitle, setTrackTitle] = useState(songs[0]?.title || '');
  const [trackArtwork, setTrackArtwork] = useState(songs[0]?.artwork || '');
  const [trackArtist, setTrackArtist] = useState(songs[0]?.artist || '');

  const [repeatMode, setRepeatMode] = useState('off');
  const [stateUpdated, setStateUpdated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  
  const togglePlayBack = async playBackState => {
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

  const setUpPlayers = async songs => {
    try {
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

      await TrackPlayer.add(songs);
    } catch (e) {
      console.log(e);
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      console.log(event.nextTrack);
      const track = await TrackPlayer.getTrack(event.nextTrack);

      const {title, artwork, artist} = track;

      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

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

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setUpPlayers(songs);

    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);

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

  const renderSong = ({item, index}) => {
    return (
      <Animated.View style={style.mainImageWrapper}>
      <View style={[style.imageWrapper, style.elevation]}>
        <Image source={{uri: `${trackArtwork}`}} style={style.musicImage} />
      </View>
    </Animated.View>
    )
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.maincontainer}>
        {/*Image*/}
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSong}
          data={songs}
          keyExtractor={item => item.id}
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
            {useNativeDriver: true},
          )}
        />

        {/*Song content*/}

        <View>
          <Text style={[style.songTitle, style.songContent]}>{trackTitle}</Text>
          <Text style={[style.songArtist, style.songContent]}>
            {trackArtist}
          </Text>
        </View>

        {/*Slider*/}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          {/*Music Duration */}
          <View style={style.progressLevelDuration}>
            <Text style={style.progressLabelText}>
              {
                new Date(progress.position * 1000)
                  .toLocaleTimeString()
                  .substring(3)
                  .split(' ')[0]
              }
            </Text>
            <Text style={style.progressLabelText}>
              {
                new Date((progress.duration - progress.position) * 1000)
                  .toLocaleTimeString()
                  .substring(3)
                  .split(' ')[0]
              }
            </Text>
          </View>
        </View>

        {/*Music control*/}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              togglePlayBack(playBackState);
            }}>
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
      <View style={style.bottomContainer}>
        <View style={style.bottomIconWrapper}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="share-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },

  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: '#393E46',
    borderWidth: 1,
  },
  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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

  songTitle: {
    fontSize: 16,
    fontWeight: 300,
  },

  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
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
    color: '#fff',
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
