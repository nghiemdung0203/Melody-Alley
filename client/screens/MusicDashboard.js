import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCurrentSong,
  setRecentlyTracks,
  setSongsArray,
  setCurrentLikedSong,
} from '../redux/reducers/reducer';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Clipboard from '@react-native-clipboard/clipboard';
import ModalLogin from '../Components/ModalLogin';

const MusicDashboard = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const currentLikedSong = useSelector(state => state.music.currentLikedSong);

  useEffect(() => {
    getTopTrack();
  }, []);

  const getTopTrack = async () => {
    try {
      await axios
        .get('http://10.0.2.2:5002/song/getTopTrack')
        .then(response => {
          setSongs(response.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const NavigateTo = (screenName, params = {}) => {
    navigation.navigate(screenName, params);
  };

  const likeSong = async songID => {
    if (user.id !== undefined) {
      try {
        const response = await axios.post(
          'http://10.0.2.2:5002/LikedSong/LikedSong',
          {
            UserID: user.id,
            SongID: songID,
          },
        );

        if (response.status === 200) {
          console.log('Song liked:', response.data);
          dispatch(setCurrentLikedSong({currentLikedSong: response.data}));
        }
      } catch (error) {
        console.error('Error liking song:', error);
      }
    } else {
      setModalVisible(true);
    }
  };

  const selectSong = index => {
    dispatch(setSongsArray({songsArray: songs}));
    dispatch(setRecentlyTracks({recentlyTracks: songs[index]}));
    dispatch(setCurrentSong({currentSong: songs[index]}));
    navigation.navigate('MusicContainer', {SongID: index});
  };

  const copyLink = SongID => {
    const appDomain = 'yourapp://';
    const musicPlayerRoute = 'MusicPlayer';
    const link = `${appDomain}${musicPlayerRoute}?songIndex=${SongID}`;

    Clipboard.setString(link);
  };

  const renderItem = ({item, index}) => {
    const isLiked = currentLikedSong.some(likedSong => {
      return likedSong.SongID === item._id;
    });
    return (
      <View style={styles.songContainer}>
        <TouchableOpacity
          style={styles.songInfo}
          onPress={() => selectSong(index)}>
          <Image source={{uri: item.Thumbnail}} style={styles.songImage} />
          <View style={styles.songDetails}>
            <Text
              style={styles.songTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.titleSong}
            </Text>
            <Text style={styles.songAuthor}>{item.AuthorID}</Text>
          </View>
        </TouchableOpacity>
        <Menu>
          <MenuTrigger text="Edit" />
          <MenuOptions>
            <MenuOption
              onSelect={() => likeSong(item._id)}
              style={styles.menuOption}>
              <AntDesign
                name={isLiked ? 'heart' : 'hearto'}
                size={30}
                color={isLiked ? 'red' : '#333'}
              />
              <Text style={styles.labelMenuOption}>Like Song</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => NavigateTo('AddToPlaylist', {song: songs[index]})}
              style={styles.menuOption}>
              <MaterialIcons name="playlist-add" size={30} color="#333" />
              <Text style={styles.labelMenuOption}>Add playlist</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                copyLink(item._id);
              }}
              style={styles.menuOption}>
              <Feather name="copy" size={30} color="#333" />
              <Text style={styles.labelMenuOption}>Copy Link</Text>
            </MenuOption>
            <MenuOption onSelect={() => {}} style={styles.menuOption}>
              <MaterialIcons name="report" size={30} color="#333" />
              <Text style={styles.labelMenuOption}>Report</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MUSIC</Text>
        <View style={styles.iconContainer}>
          {user.id !== undefined ? (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 55,
                  aspectRatio: 1,
                }}>
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/dfsucyg30/image/upload/v1724306652/nqd_lzctol.jpg',
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 30,
                  borderRadius: 20,
                  backgroundColor: '#333',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
                onPress={() => NavigateTo('Login')}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.searchContainer}>
      <Feather name="search" size={20} color="#86939e" style={styles.icon} />
      <TextInput
        style={styles.searchInput}
        
        placeholder='Search...'
        placeholderTextColor="#86939e"
      />
      </View>
      <Text style={styles.title}>Popular Right Now</Text>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dfsucyg30/image/upload/v1722849162/sl_123119_26540_50_zlqvny.jpg',
          }}
          style={styles.banner}
        />
        <AntDesign name="playcircleo" size={20} style={styles.playIcon} />
      </View>
      <View style={styles.albumHeader}>
        <Text style={styles.albumText}>Albums</Text>
        <Text style={styles.seeAllText}>See all</Text>
      </View>
      <View style={styles.albumContainer}>
        <View style={styles.albumImageContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dfsucyg30/image/upload/v1691593789/dyn6vdbxr1c53nvujjgu.png',
            }}
            style={styles.albumImage}
          />
          <AntDesign name="playcircleo" size={20} style={styles.playIcon} />
        </View>
        <View style={styles.albumImageContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dfsucyg30/image/upload/v1691593789/dyn6vdbxr1c53nvujjgu.png',
            }}
            style={styles.albumImage}
          />
          <AntDesign name="playcircleo" size={20} style={styles.playIcon} />
        </View>
      </View>
      <View style={[styles.albumHeader, {marginTop: '4%'}]}>
        <Text style={styles.albumText}>Top Tracks</Text>
        <Text style={styles.seeAllText}>See all</Text>
      </View>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <ModalLogin visible={modalVisible} setVisible={setModalVisible} />
    </View>
  );
};

export default MusicDashboard;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: '10%'},
  header: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  searchIcon: {resizeMode: 'contain'},
  iconContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '20%',
    justifyContent: 'space-between',
    position: 'relative',
    top: '15%',
    gap: 10,
  },
  title: {marginTop: '7%', fontSize: 20, fontWeight: '600', color: 'black'},
  bannerContainer: {
    height: '20%',
    width: '100%',
    borderRadius: 20,
    marginTop: '5%',
    elevation: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  banner: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  albumHeader: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumText: {fontSize: 20, fontWeight: '600', color: 'black'},
  seeAllText: {fontSize: 15, color: 'rgba(0,0,0,0.4)', fontWeight: '600'},
  albumContainer: {
    flexDirection: 'row',
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  albumImageContainer: {
    height: '80%',
    width: '45%',
    borderRadius: 20,
    elevation: 10,
    backgroundColor: '#ffffff',
  },
  albumImage: {height: '100%', width: '100%', borderRadius: 20},
  playIcon: {position: 'absolute', color: 'red', bottom: '8%', right: '5%'},
  songContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
  },
  songInfo: {flexDirection: 'row', alignItems: 'center'},
  songImage: {
    height: 70,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  songDetails: {marginLeft: '10%'},
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    maxWidth: 180,
    fontFamily: '',
  },
  songAuthor: {fontSize: 13, fontWeight: '600', color: 'grey', margintop: 5},
  menuOption: {flexDirection: 'row', gap: 13, alignItems: 'center'},
  labelMenuOption: {fontSize: 15, fontWeight: '600', color: '#333'},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginTop: 25,
    height: 50,
    width: '100%'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  }
});
