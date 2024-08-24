import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MusicContainer from './screens/MusicContainer';
import OnboardingScreen from './screens/OnBoarding';
import MusicDashboard from './screens/MusicDashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import { Provider } from 'react-redux';
import store from './redux/store';
import withBottomContainer from './Components/BottomComponent';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Upload from './screens/Upload';
import YourLibrary from './screens/YourLibrary';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MusicDashboard">
            <Stack.Screen
              options={{ headerShown: false }}
              name="MusicContainer"
              component={withBottomContainer(MusicContainer)}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="OnBoarding"
              component={withBottomContainer(OnboardingScreen)}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={Register}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="MusicDashboard"
              component={withBottomContainer(MusicDashboard)}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Upload"
              component={withBottomContainer(Upload)}
            />
           
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
