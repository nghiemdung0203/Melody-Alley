import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSongsArray } from '../redux/reducers/reducer';






const MusicDashboard = () => {

  const [songs, setSongs] = useState([])
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getTopTrack = async () => {
    try {
      await axios.get('http://10.0.2.2:5002/song/getTopTrack').then((response) => {
        setSongs(response.data)
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    getTopTrack();
  }, [])

  const selectSong = (index) => {
    dispatch(setSongsArray({ songsArray: songs, selectedSongIndex: index }))
    navigation.navigate('MusicContainer')
  }

  const renderItem = ({ item, index }) => {

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '5%'
      }}>
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center'
        }} onPress={() => { selectSong(index) }}>


          <Image
            source={{ uri: item.Thumbnail }}
            style={{
              height: 70,
              width: 70,
              resizeMode: 'contain',
              borderRadius: 20
            }}
          />

          <View style={{
            marginLeft: '10%'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'black',
              maxWidth: 180
            }} numberOfLines={1}
              ellipsizeMode="tail">{item.titleSong}</Text>
            <Text style={{
              fontSize: 13,
              fontWeight: '600',
              color: 'grey',
              margintop: 5
            }}>{item.AuthorID}</Text>
          </View>

        </TouchableOpacity>


        <MaterialCommunityIcons name="dots-vertical" size={30} style={{
          resizeMode: 'contain'
        }} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{'MUSIC'}</Text>
        <View style={styles.iconContainer}>
          <Feather name="search" size={20} style={styles.searchIcon} />
          <Feather name="menu" size={20} style={styles.menu} />
        </View>
      </View>
      <Text style={styles.title}>
        {"Popular Right Now"}
      </Text>
      <View style={styles.bannerContainer}>
        <Image source={{ uri: "https://res.cloudinary.com/dfsucyg30/image/upload/v1722849162/sl_123119_26540_50_zlqvny.jpg" }}
          style={styles.banner} />
        <AntDesign name='playcircleo' size={20} style={styles.playIcon} />
      </View>


      <View style={styles.albumHeader}>
        <Text style={styles.albumText}>
          {"Albums"}
        </Text>
        <Text style={styles.seeAllText}>
          {"See all"}
        </Text>
      </View>

      <View style={styles.albumContainer}>
        <View style={styles.albumImageContainer}>
          <Image source={{ uri: 'https://res.cloudinary.com/dfsucyg30/image/upload/v1691593789/dyn6vdbxr1c53nvujjgu.png' }} style={styles.albumImage} />
          <AntDesign name='playcircleo' size={20} style={styles.playIcon} />
        </View>
        <View style={styles.albumImageContainer}>
          <Image source={{ uri: 'https://res.cloudinary.com/dfsucyg30/image/upload/v1691593789/dyn6vdbxr1c53nvujjgu.png' }} style={styles.albumImage} />
          <AntDesign name='playcircleo' size={20} style={styles.playIcon} />
        </View>
      </View>

      <View style={[styles.albumHeader, { marginTop: '4%' }]}>
        <Text style={styles.albumText}>
          {"Top Tracks"}
        </Text>
        <Text style={styles.seeAllText}>
          {"See all"}
        </Text>
      </View>

      <FlatList
        data={songs}
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

export default MusicDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '10%',
  },
  header: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  searchIcon: {
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '20%',
    justifyContent: 'space-between',
    position: 'relative',
    top: '15%'
  },
  title: {
    marginTop: '7%',
    fontSize: 20,
    fontWeight: '600',
    color: 'black'
  },
  bannerContainer: {
    height: '20%',
    width: '100%',
    borderRadius: 20,
    marginTop: '5%',
    elevation: 10,  // Adjust this value for shadow intensity
    backgroundColor: '#ffffff',  // Required for the shadow to be visible on Android
    overflow: 'hidden',
  },
  banner: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover', // contain or cover
    borderRadius: 20
  },
  albumHeader: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  albumText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black'

  },
  seeAllText: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.4)',
    fontWeight: '600'
  },
  albumContainer: {
    flexDirection: 'row',
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  albumImageContainer: {
    height: '80%',
    width: '45%',
    borderRadius: 20,
    elevation: 10,  // Adjust this value for shadow intensity
    backgroundColor: '#ffffff',  // Required for the shadow to be visible on Android
  },
  albumImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20
  },
  playIcon: {
    position: 'absolute',
    color: 'red',
    bottom: '8%',
    right: '5%',
  }

});
