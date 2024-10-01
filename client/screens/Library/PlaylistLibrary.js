import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import ModalLogin from '../../Components/ModalLogin';
import BottomSheet from '../../Components/BottomSheet';
import CreatePlaylistBottomSheet from '../../Components/CreatePlaylistBottomSheet';

const {width} = Dimensions.get('window');
const PlaylistLibrary = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const refRBSheet = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const song = useSelector(state => state.music.songsArray);

  const goBack = () => {
    navigation.goBack();
  };

  const getYourPlaylists = async () => {
    if (user.id !== undefined) {
      await axios
        .get(`http://10.0.2.2:5002/Playlist/GetPlaylist?UserID=${user.id}`)
        .then(response => {
          setUserPlaylist(response.data);
        });
    }
  };

  useEffect(() => {
    getYourPlaylists();
  }, []);

  const openRBSheet = () => {
    if (user.id !== undefined) {
      refRBSheet.current.open();
    } else {
      setModalVisible(true);
    }
  };

  const closeRBSheet = () => {
    refRBSheet.current.close();
  };

  const handlePlaylistCreated = () => {
    closeRBSheet();
    getRecentlyPlaylist();
  };

  const navigateToPlaylistPage = (playlistID) => {
    navigation.navigate('PlaylistPage', {
      playlistID: playlistID,
    });
  }
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.songContainer}>
        <TouchableOpacity
          style={styles.songInfo}
          onPress={() => navigateToPlaylistPage(item._id)}>
          <View style={styles.imageContainer}>
            <Image source={{uri: item.Thumbnail}} style={styles.songImage} />
          </View>
          <View style={styles.songDetails}>
            <Text
              style={styles.songTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.Name}
            </Text>
          </View>
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={30}
          style={{
            resizeMode: 'contain',
            paddingRight: 20,
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/**Header */}
      <View style={styles.HeaderContainer}>
        <View
          style={{
            flexDirection: 'row',
            gap: 30,
          }}>
          <TouchableOpacity onPress={goBack}>
            <Feather name="chevron-down" size={30} color="#333" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '900',
              color: '#333',
            }}>
            Playlists
          </Text>
        </View>
        <MaterialCommunityIcons name="dots-vertical" size={30} color="#333" />
      </View>

      {/**Danh sach phat moi */}
      <TouchableOpacity style={styles.NewPlaylistButton} onPress={openRBSheet}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: '#fff',
          }}>
          Danh sách phát mới
        </Text>
      </TouchableOpacity>

      <ModalLogin visible={modalVisible} setVisible={setModalVisible} />

      {/**BottomSheet */}
      <BottomSheet bottomSheetRef={refRBSheet}>
        <CreatePlaylistBottomSheet
          onClose={closeRBSheet}
          user={user}
          song={song}
          onPlaylistCreated={handlePlaylistCreated}
        />
      </BottomSheet>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyTextPlaylist}>Recently added</Text>
        <FlatList
          data={userPlaylist}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default PlaylistLibrary;

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    padding: 25,
  },
  NewPlaylistButton: {
    width: 220,
    height: 50,
    backgroundColor: '#333',
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    padding: 25,
  },
  bodyTextPlaylist: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
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
  songDetails: {marginLeft: '10%'},
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    maxWidth: 180,
  },
  songAuthor: {
    fontSize: 13,
    fontWeight: '600',
    color: 'grey',
    margintop: 5,
  },
});
