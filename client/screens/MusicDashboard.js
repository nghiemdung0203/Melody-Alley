import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
const MusicDashboard = () => {
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
      </View>


      <View style={styles.albumHeader}>
        <Text style={styles.albumText}>
          {"Albums"}
        </Text>
        <Text style={styles.seeAllText}>
          {"See all"}
        </Text>
      </View>

     
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
    fontWeight: '600'
  },
  bannerContainer: {
    height: '20%',
    width: '100%',
    borderRadius: 20,
    marginTop: '5%',
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    overflow: 'hidden'
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
    fontWeight: 600,

  },
  

});
