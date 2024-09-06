import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Modal, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import MiniPlayer from './MiniPlayer';


const { width } = Dimensions.get('window')
const withBottomContainer = (Component) => {
 

  return ({ navigation, route, ...props }) => {
    const navigate = useNavigation();
    const excludeScreens = ['Login', 'Register', 'MusicContainer']; // Added 'MusicContainer'

    const shouldShowBottomContainer = !excludeScreens.includes(route.name);
    const showMiniPlayer = route.name !== 'MusicContainer'; // Determine if MiniPlayer should be shown

    const currentSong = useSelector((state) => state.music.currentSong);

    const homeFunction = () => {
      navigate.navigate('MusicDashboard');
    };

    const uploadFunction = () => {
      navigate.navigate('Upload');
    };

    const libraryFunction = () => {
      navigate.navigate('Library');
    };

    return (
      <>
        <Component {...props} />

        {showMiniPlayer && currentSong && Object.keys(currentSong).length > 0 && (
          <MiniPlayer currentSong={currentSong} />
        )}

        {shouldShowBottomContainer && (
          <View style={{
            width: '100%', // Assuming you want full width
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
            <View style={style.bottomContainer}>
              <View style={style.bottomIconWrapper}>
                <TouchableOpacity style={style.bottomButton} onPress={homeFunction}>
                  <FontAwesome name="home" size={30} color="black" />
                  <Text style={style.buttonLabel}>
                    HOME
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.bottomButton} onPress={libraryFunction}>
                  <Ionicons name="library" size={30} color="black" />
                  <Text style={style.buttonLabel}>
                    LIBRARY
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.bottomButton} onPress={uploadFunction}>
                  <Entypo name="upload-to-cloud" size={30} color="black" />
                  <Text style={style.buttonLabel}>
                    UPLOAD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.bottomButton}>
                  <Ionicons name="settings" size={30} color="black" />
                  <Text style={style.buttonLabel}>
                    SETTING
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </>
    );
  };
};

export default withBottomContainer;


const style = StyleSheet.create({
  bottomContainer: {
    width: width ,
    alignItems: 'center',
    paddingVertical: 10,
    
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 10, // Reduce this value or remove it if not needed
  },
  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  bottomButton: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black'
  }
})
