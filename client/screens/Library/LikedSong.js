import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');


const LikedSong = () => {
    const navigation = useNavigation()
    const [likedSong, setLikedSong] = useState([]);
    const user = useSelector((state) => state.user.user)

    const fetchLikedSong = async () => {
        if (user.id !== undefined) {
            await axios.get(`http://10.0.2.2:5002/LikedSong/getLikedSong?UserID=${user.id}`).then((response) => {
                setLikedSong(response.data)
            })
        }
    }

    useEffect(() => {
            fetchLikedSong();
        }, [])

    const goBack = () => {
        navigation.goBack();
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={style.songContainer}>
                <TouchableOpacity style={style.songInfo} onPress={() => selectSong(index)}>
                    <View style={style.imageContainer}>
                        <Image source={{ uri: item.Thumbnail }} style={style.songImage} />
                    </View>
                    <View style={style.songDetails}>
                        <Text style={style.songTitle} numberOfLines={1} ellipsizeMode="tail">{item.titleSong}</Text>
                        <Text style={style.songAuthor}>{item.AuthorID}</Text>
                    </View>
                </TouchableOpacity>
                <MaterialCommunityIcons name="dots-vertical" size={30} style={{
                    resizeMode: 'contain',
                    paddingRight: 20
                }} />
            </View>
        );
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <View style={style.HeaderContainer}>
                <View style={{
                    flexDirection: 'row',
                    gap: 30
                }}>
                    <TouchableOpacity onPress={goBack}>
                        <Feather name="chevron-down" size={30} color="#333" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: '900',
                        color: '#333'
                    }}>Liked Tracks</Text>
                </View>
                <MaterialCommunityIcons name="broadcast" size={30} color="#333" />
            </View>

            <FlatList
                data={likedSong}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default LikedSong
const style = StyleSheet.create({
    HeaderContainer: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
        padding: 25
    },
    textHeader: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
        alignSelf: 'center'
    },
    songContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '5%',
        gap: 10,
        paddingLeft: 20
    },
    songInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        backgroundColor: '#fff',
        width: 70,
        aspectRatio: 1,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    songImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 20
    },
    songDetails: { marginLeft: '10%' },
    songTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        maxWidth: 180
    },
    songAuthor: {
        fontSize: 13,
        fontWeight: '600',
        color: 'grey',
        margintop: 5
    },

})