import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
const YourLibrary = () => {

  const renderRecentlyPlayed = ({ item, index }) => {
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
    <View style={{
      flex: 1,

    }}>
      <View style={styles.header}>

        <View style={{
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15
        }}>
          <Image source={{ uri: 'https://res.cloudinary.com/dfsucyg30/image/upload/v1724306652/nqd_lzctol.jpg' }} style={styles.avatar} />
          <Text style={styles.headerTitle}>Library</Text>
        </View>

        <View style={{
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15
        }}>
          <Feather name='search' color='black' size={30} />
          <Ionicons name='add-circle-outline' color='black' size={30} />
        </View>
      </View>

      <View style={{
        flexDirection: 'column',
        width: '100%',
        maxHeight: '80%',
        marginTop: 20
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 50,
          elevation: 10
        }}>
          <TouchableOpacity style={styles.buttonCom}>
            <AntDesign name="heart" size={20} color="red" />
            <Text style={styles.buttonLabel}>Liked tracks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCom}>
            <MaterialCommunityIcons name="playlist-music-outline" size={20} color="#008080" />
            <Text style={styles.buttonLabel}>Playlists</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 50,
          marginTop: 20
        }}>
          <TouchableOpacity style={styles.buttonCom}>
            <MaterialCommunityIcons name="album" size={20} color="blue" />
            <Text style={styles.buttonLabel}>Album</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCom}>
            <AntDesign name="clouddownloado" size={20} color="#b4d141" />
            <Text style={styles.buttonLabel}>Downloaded</Text>
          </TouchableOpacity>
        </View>

        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          position: 'relative',
          left: '6%',
          top: '8%',
          color: 'black'
        }}>
          Recently played
        </Text>

       
      </View>
    </View>
  )
}

export default YourLibrary

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
  },
  avatar: {
    width: '25%',
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 100,
    elevation: 10,
    overflow: 'hidden'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
    textTransform: 'uppercase',
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  buttonCom: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff', // Ensure the button has a background color

    // Shadow properties
    shadowColor: '#000', // Shadow color (black)
    shadowOffset: { width: 0, height: 8 }, // X: 0 px, Y: 8 px
    shadowOpacity: 0.15, // 15% opacity
    shadowRadius: 24, // Blur: 24 px
    elevation: 10, // Elevation for Android (adjust as needed)
  }
})