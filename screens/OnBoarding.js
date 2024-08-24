import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import { OnboardFlow } from 'react-native-onboard';
import pic1 from '../assets/undraw_audio_player_re_cl20.png';
import pic2 from '../assets/undraw_Music_re_a2jk.png';
import pic3 from '../assets/undraw_Online_media_re_r9qv.png';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

export default function OnBoarding() {
  const navigate = useNavigation();

  const handleOnDone = () => {
    navigate.navigate('Login');
  }
  return (
    <View style={style.container}>
      <OnboardFlow
              
        pages={[
          {
            title: 'Active',
            subtitle: "Discover other people's favorites songs",
            imageUri: Image.resolveAssetSource(pic2).uri,
          },
          {
            title: 'Sharing',
            subtitle: 'Share your music with your friends',
            imageUri: Image.resolveAssetSource(pic3).uri,
          },
          {
            title: 'Enjoy',
            subtitle: 'Enjoy your music on our platform',
            imageUri: Image.resolveAssetSource(pic1).uri,
          }
        ]}
        type={'fullscreen'}
        onDone={handleOnDone}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
});