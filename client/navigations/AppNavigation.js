import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import { LikedSong, Login, MusicContainer, OnBoarding, Register } from '../screens';
import MiniPlayer from '../Components/MiniPlayer';
import { useSelector } from 'react-redux';
import { useNavigationContainerRef } from '@react-navigation/native';
import AddToPlaylist from '../screens/AddToPlaylist';
import PlaylistLibrary from '../screens/Library/PlaylistLibrary';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const currentSong = useSelector((state) => state.music.currentSong);
    const navigationRef = useNavigationContainerRef();
    const [currentRoute, setCurrentRoute] = React.useState();

    // Define the routes where MiniPlayer should not be displayed
    const excludedRoutes = ['MusicContainer', 'Login', 'Register'];

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                setCurrentRoute(navigationRef.getCurrentRoute().name)
            }}
            onStateChange={() => {
                const currentRouteName = navigationRef.getCurrentRoute().name;
                setCurrentRoute(currentRouteName);
            }}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}
                initialRouteName='Main'
            >
                <Stack.Screen name='Main' component={BottomNavigation} />
                <Stack.Screen name='LikedSong' component={LikedSong} options={{ headerShown: false }} />
                <Stack.Screen name='PlaylistLibrary' component={PlaylistLibrary} options={{ headerShown: false }} />
                <Stack.Screen name='MusicContainer' component={MusicContainer} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name='Onboarding' component={OnBoarding} options={{ headerShown: false }} />
                <Stack.Screen name='AddToPlaylist' component={AddToPlaylist} options={{ headerShown: false }} />
            </Stack.Navigator>
            {/* Check if the current route is in the excluded routes array */}
            {!excludedRoutes.includes(currentRoute) && 
                currentSong && Object.keys(currentSong).length > 0 && <MiniPlayer currentSong={currentSong} />}
        </NavigationContainer>
    )
}

export default AppNavigation;
