import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const {width} = Dimensions.get('window')
const withBottomContainer = (Component) => {
    const [repeatMode, setRepeatMode] = useState('off');

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




    return ({ navigation, route, ...props }) => {
        const excludeScreens = ['Login', 'Register'];

        const shouldShowBottomContainer = !excludeScreens.includes(route.name);


        return (
            <>
                <Component {...props} />
                {shouldShowBottomContainer && (
                    <View style={style.bottomContainer}>
                        <View style={style.bottomIconWrapper}>
                            <TouchableOpacity>
                                <FontAwesome name="home" size={30} color="#888888" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={changeRepeatMode}>
                                <MaterialCommunityIcons
                                    name={repeatIcon()}
                                    size={30}
                                    color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <FontAwesome name="home" size={30} color="#888888" />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Ionicons name="share-outline" size={30} color="#888888" />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
                            </TouchableOpacity>
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
        width: width * 0.9,
        alignItems: 'center',
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    bottomIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
})
