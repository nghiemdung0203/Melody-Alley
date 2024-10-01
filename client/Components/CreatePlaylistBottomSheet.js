import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'

const { width } = Dimensions.get('window')
const CreatePlaylistBottomSheet = ({ onClose, user, song, onPlaylistCreated }) => {
    const [playlistName, setPlaylistName] = useState('playlistName');

    const CreatePlaylsit = async () => {
        const createdPlaylist = await axios.post('http://10.0.2.2:5002/Playlist/CreatedPlaylist', {
            Name: playlistName,
            AuthorID: user.id,
            Thumbnail: song.Thumbnail
        })
        console.log(typeof(createdPlaylist.data._id))
        await axios.post('http://10.0.2.2:5002/Playlist/AddSongToPlaylist', {
            PlaylistID: createdPlaylist.data._id,
            SongID: song._id
        }).then((response) => {
           if(response.status === 200) {
            onPlaylistCreated();
           }
        })
    }


    return (
        <View style={{
            flexDirection: 'column',
        }}>
            {/**Header */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={onClose} style={style.cancelButton}>
                    <Feather name='x' size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "900",

                }}>Create Playlist</Text>
                <TouchableOpacity style={{
                    width: 58,
                    height: 38,
                    backgroundColor: '#333',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={CreatePlaylsit}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '800',
                        color: '#fff'
                    }}>Save</Text>
                </TouchableOpacity>
            </View>

            {/**Input */}
            <Text style={{
                fontSize: 15,
                color: '#333',
                paddingLeft: width * 0.1,
            }}>Playlist title</Text>
            <TextInput onChangeText={setPlaylistName} value={playlistName} style={style.playlistNameInput} />


        </View>
    )
}

export default CreatePlaylistBottomSheet

const style = StyleSheet.create({
    cancelButton: {
        width: 38,
        aspectRatio: 1,
        borderRadius: 30
    },
    playlistNameInput: {
        width: width * 0.8,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333'
    }
})