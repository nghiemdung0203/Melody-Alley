import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('')
    const navigate = useNavigation();


    const Register_Process = async () => {
        await axios
            .post('http://10.0.2.2:5002/auth/register', {
                username: username,
                mail: email,
                password: password,
            })
            .then((response) => {
                console.log(response.data);
                navigate.navigate('MusicDashboard')

                // Handle successful response here
            })
            .catch((error) => {
                console.error(error);
                // Handle error here, e.g., display an error message to the user
            });
    };


    const toLogin = () => {
        navigate.navigate('Login')
    }

    return (
        <SafeAreaView style={{
            backgroundColor: '#ffffff'
        }}>
            <View
                style={{
                    padding: 20,
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={style.LoginText}>Register Here</Text>
                    <Text style={style.Welcome}>Welcome you to join us!</Text>
                </View>
                <View
                    style={{
                        marginVertical: 30,
                    }}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'#626262'}
                        value={email} // Use the email state as the value
                        onChangeText={(text) => setEmail(text)} // Update the email state when the text changes
                        style={{
                            fontSize: 14,
                            padding: 20,
                            backgroundColor: '#f1f4ff',
                            borderRadius: 30,
                            marginVertical: 10,
                        }}
                    />

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'#626262'}
                        value={password} // Use the password state as the value
                        onChangeText={(text) => setPassword(text)} // Update the password state when the text changes
                        secureTextEntry
                        style={{
                            fontSize: 14,
                            padding: 20,
                            backgroundColor: '#f1f4ff',
                            borderRadius: 30,
                            marginVertical: 10,
                        }}
                    />

                    <TextInput
                        placeholder="Username"
                        placeholderTextColor={'#626262'}
                        value={username} // Use the password state as the value
                        onChangeText={(text) => setusername(text)} // Update the password state when the text changes
                        style={{
                            fontSize: 14,
                            padding: 20,
                            backgroundColor: '#f1f4ff',
                            borderRadius: 30,
                            marginVertical: 10,
                        }}
                    />
                </View>

                <TouchableOpacity style={style.SignInbuton} onPress={Register_Process}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#fff',
                        }}>
                        Register
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        padding: 10,
                    }} onPress={toLogin}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#000',
                        }}>
                        Already have an account
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        marginVertical: 30,
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#000',
                        }}>
                        Or continue with
                    </Text>

                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 20,

                    }}>
                        <TouchableOpacity style={style.otherLogin}>
                            <Ionicons name="logo-google" color={'##df2d47'} size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.otherLogin}>
                            <Ionicons name="logo-apple" color={'#000'} size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.otherLogin}>
                            <Ionicons name="logo-facebook" color={'#1F41BB'} size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    LoginText: {
        fontSize: 30,
        color: '#1F41BB',
        marginVertical: 30,
    },

    Welcome: {
        fontSize: 20,
        maxWidth: '60%',
        textAlign: 'center',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#1F41BB',
        alignSelf: 'flex-end',
    },
    SignInbuton: {
        padding: 20,
        backgroundColor: '#1F41BB',
        marginVertical: 30,
        borderRadius: 10,
        shadowColor: '#1F41BB',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    otherLogin: {
        padding: 10,
        backgroundColor: '#ECECEC',
        borderRadius: 5,
        marginHorizontal: 10
    }
});
