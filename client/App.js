import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MusicContainer from './screens/MusicContainer';
import OnboardingScreen from './screens/OnBoarding';
import Login_Register from './screens/Login_Register';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MusicContainer">
          <Stack.Screen
            options={{headerShown: false}}
            name="MusicContainer"
            component={MusicContainer}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="OnBoarding"
            component={OnboardingScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login_Register}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
