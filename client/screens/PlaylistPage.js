import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCurrentSong, setRecentlyTracks, setSongsArray} from '../redux/reducers/reducer';

const {width} = Dimensions.get('window');
const PlaylistPage = ({route}) => {
  const {playlistID} = route.params;
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getSongFromPlaylist = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:5002/Playlist/GetSongFromPlaylist?playlistID=${playlistID}`,
      );
      setPlaylistDetails(response.data.playlistDetails);
      setSongs(response.data.songs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching playlist songs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSongFromPlaylist();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const selectSongPlaylist = (index) => {
    const optimizedSongs = songs.map(song => ({
      _id: song.SongID._id,
      titleSong: song.SongID.titleSong,
      Thumbnail: song.SongID.Thumbnail,
      AuthorID: song.SongID.AuthorID,
      GenreID: song.SongID.GenreID,
      url: song.SongID.url,
    }));
    dispatch(setSongsArray({songsArray: optimizedSongs}));
    dispatch(setRecentlyTracks({recentlyTracks: optimizedSongs[index]}));
    dispatch(setCurrentSong({currentSong: optimizedSongs[index]}));
    navigation.navigate('MusicContainer', { SongID: index });
  };

  const renderSongItem = ({item, index}) => {
    return (
      <View style={styles.songContainer}>
        <TouchableOpacity style={styles.songInfo} onPress={() => selectSongPlaylist(index)}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.SongID.Thumbnail}}
              style={styles.songImage}
            />
          </View>
          <View style={styles.songDetails}>
            <Text
              style={styles.songTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.SongID.titleSong.replace('.mp3', '')}
            </Text>
          </View>
        </TouchableOpacity>
        <MaterialCommunityIcons name="dots-vertical" size={30} color={'#333'} />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/**Header */}
      <View style={styles.HeaderContainer}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="chevron-down" size={30} color="#333" />
        </TouchableOpacity>
        <MaterialCommunityIcons name="broadcast" size={30} color="#333" />
      </View>

      {/**Playlist Info */}
      {playlistDetails && (
        <View style={styles.playlistInfoContainer}>
          <Image
            source={{uri: playlistDetails.PlaylistID.Thumbnail}}
            style={styles.playlistImage}
          />
          <View style={{flexDirection: 'column', padding: 10}}>
            <Text
              style={styles.playlistTitle}
              numberOfLines={2}
              ellipsizeMode="tail">
              {playlistDetails.PlaylistID.Name}
            </Text>
            <Text
              style={styles.playlistAuthor}
              numberOfLines={1}
              ellipsizeMode="tail">
              Made for {playlistDetails.PlaylistID.AuthorID.username}
            </Text>
          </View>
        </View>
      )}

      {/**Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.playButton}>
            <FontAwesome name="play" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="random" size={30} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/**Song List */}
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 20}}
      />
    </View>
  );
};

export default PlaylistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    padding: 25,
  },
  playlistInfoContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  playlistImage: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 30,
  },
  playlistTitle: {
    fontSize: 25,
    fontWeight: '800',
  },
  playlistAuthor: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 25,
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    aspectRatio: 1,
    backgroundColor: '#333',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
    gap: 10,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#fff',
    width: 70,
    aspectRatio: 1,
    borderRadius: 20,
  },
  songImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  songDetails: {
    marginLeft: '10%',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    maxWidth: 180,
  },
});
