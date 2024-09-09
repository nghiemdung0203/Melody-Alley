import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SafeAreaView, StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import AppNavigation from './navigations/AppNavigation';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <MenuProvider>
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>
          <AppNavigation />
          <StatusBar style='auto' />
        </SafeAreaView>
      </MenuProvider>
    </Provider>
  );
};

export default App;
