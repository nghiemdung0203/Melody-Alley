import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Upload = () => {
    const navigate = useNavigation()
    const [file, setFile] = useState(null);
    const [artist, setArtist] = useState(null);
    const [genre, setGenre] = useState(null);
    const [Thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState(null);

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio], // Allow selection of audio files, including MP3
            });
            setFile(res[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled the file selection');
            } else {
                throw err;
            }
        }
    };

    const getTrackInfo = async () => {
        const formData = new FormData();
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        formData.append('song', file);
        if (file) {
            try {
                await axios.post('http://10.0.2.2:5002/song/createSong', formData, { headers }).then((response) => {
                    console.log(response.data);
                    setTitle(response.data.titleSong);
                    setArtist(response.data.AuthorID);
                    setGenre(response.data.GenreID);
                    setThumbnail(response.data.Thumbnail);
                });
            } catch (error) {
                if (error.response) {
                    console.log('Response Error:', error.response.data);
                } else if (error.request) {
                    console.log('Request Error:', error.request);
                } else {
                    console.log('Error:', error.message);
                }
            }
        } else {
            return
        }
    };


    const uploadSong = async () => {
        const formData = new FormData();
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
    
        if (title && artist && genre) {
            formData.append('song', file);
            formData.append('title', title);
            formData.append('artist', artist);
            formData.append('thumbnail', Thumbnail);
            formData.append('genre', genre);
    
            try {
                const response = await axios.post('http://10.0.2.2:5002/song/uploadSong', formData, { headers });
                navigate.navigate('MusicDashboard');
            } catch (error) {
                console.error('Upload failed:', error.message);
                // Handle the error (e.g., show a toast or alert)
            }
        } else {
            console.warn('Please fill out all fields before uploading.');
        }
    };
    
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 20
            }}>
                <TouchableOpacity>
                    <Ionicons name='arrow-back' size={30} color='black' />
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10
                }}>
                    <TouchableOpacity>
                        <Feather name='cast' size={30} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 50,
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={uploadSong}>
                        <Text style={{
                            fontSize: 10,
                            color: '#fff',
                            fontWeight: '600'
                        }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                paddingVertical: 20,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'black'
                }}>UPLOAD YOUR SONGS</Text>
                <Text style={{
                    padding: 10,
                    fontSize: 13,
                    color: 'grey',
                    textAlign: 'center'
                }}>Share your songs with other people. Choose an MP3 file to upload on our platform.</Text>

                <TouchableOpacity style={{
                    flexDirection: 'column',
                    borderWidth: 2,
                    borderColor: 'black',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                    width: '80%',
                    height: 300, // Set a fixed height or let the content determine height
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 20,
                }} onPress={selectFile}>
                    <MaterialIcons name="multitrack-audio" size={100} color='black' />
                    <Text style={{
                        fontSize: 13,
                        color: 'black',
                        maxWidth: '50%',
                        textAlign: 'center',
                        marginTop: 20,
                    }}>Browse and choose the file you want to upload</Text>

                    <TouchableOpacity style={{
                        width: 130,
                        height: 40,
                        borderRadius: 10,
                        marginTop: 20,
                        overflow: 'hidden'
                    }} onPress={getTrackInfo}>
                        <LinearGradient colors={['#003973', '#E5E5BE', '#003973']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                            }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: "#fff",
                                textTransform: 'uppercase',
                            }}>Browse Files</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'black',
                    alignSelf: 'flex-start',
                    marginLeft: 25,
                    marginTop: 15
                }}>
                    Song Metadata
                </Text>

                {Thumbnail && (
                    <Image source={{ uri: Thumbnail }} style={{
                        width: 150,
                        height: 150,
                        borderRadius: 10,
                        resizeMode: 'contain',
                        marginVertical: 15,
                    }} />
                )}

                <View style={{
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: 'black',
                    }}>
                        Title
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: 'black',
                    }}>
                        {title}
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: 'black',
                    }}>
                        Artist
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: 'black',
                    }}>
                        {artist}
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-between',
                    marginTop: 15,
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: 'black',
                    }}>
                        Genre
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: 'black',
                    }}>
                        {genre}
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}

export default Upload;
