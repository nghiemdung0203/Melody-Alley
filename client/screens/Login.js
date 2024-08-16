import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Font from '../config/Font';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/reducers/userReducer';

export default function Login() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigation();
  const dispatch = useDispatch()

  const login_Process = async() => {
    await axios
      .post('http://10.0.2.2:5002/auth/login', {
        mail: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        
        dispatch(setUserDetails(response.data))
        navigate.navigate('MusicDashboard')

        // Handle successful response here
      })
      .catch((error) => {
        console.error(error);
        // Handle error here, e.g., display an error message to the user
      });
  };


  const toRegister = ()=> {
    navigate.navigate('Register')
  }

  return (
    <SafeAreaView style={{
      backgroundColor: '#ffffff'
    }}>
      <View
        style={{
          padding: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={style.LoginText}>Login Here</Text>
          <Text style={style.Welcome}>Welcome back you've been missed!</Text>
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
              fontFamily: Font['poppins-regular'],
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
              fontFamily: Font['poppins-regular'],
              fontSize: 14,
              padding: 20,
              backgroundColor: '#f1f4ff',
              borderRadius: 30,
              marginVertical: 10,
            }}
          />
        </View>

        <View>
          <Text style={style.forgotPassword}>Forgot your password ?</Text>
        </View>
        <TouchableOpacity style={style.SignInbuton} onPress={login_Process}>
          <Text
            style={{
              fontFamily: Font['poppins-bold'],
              textAlign: 'center',
              fontSize: 20,
              color: '#fff',
            }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
          }} onPress={toRegister}>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
              textAlign: 'center',
              fontSize: 20,
              color: '#000',
            }}>
            Create new account
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 30,
          }}>
          <Text
            style={{
              fontFamily: Font['poppins-semiBold'],
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
              <Ionicons name="logo-google" color={'##df2d47'} size={30}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={style.otherLogin}>
              <Ionicons name="logo-apple" color={'#000'} size={30}/>
            </TouchableOpacity>

            <TouchableOpacity style={style.otherLogin}>
              <Ionicons name="logo-facebook" color={'#1F41BB'} size={30}/>
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
    fontFamily: Font['poppins-bold'],
    marginVertical: 30,
  },

  Welcome: {
    fontFamily: Font['poppins-semiBold'],
    fontSize: 20,
    maxWidth: '60%',
    textAlign: 'center',
  },
  forgotPassword: {
    fontFamily: Font['poppins-regular'],
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
