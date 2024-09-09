import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MusicDashboard, Upload, YourLibrary } from '../screens';
import { icon } from '../assets/icon';
import Search from '../screens/Search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Setting from '../screens/Setting';

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: Platform.OS === 'ios' ? 90 : 60,
        backgroundColor: '#fff'
    }
}
const BottomNavigation = () => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='MusicDashboard' component={MusicDashboard} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <MaterialCommunityIcons name={focused ? icon.home : icon.home_outline} size={30} color={focused ? '#00bfff' : '#888886'} />

                    )
                }
            }} />
            <Tab.Screen name='Library' component={YourLibrary} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <Ionicons name={focused ? icon.library : icon.library_outline} size={30} color={focused ? '#00bfff' : '#888886'} />
                    )
                }
            }} />
            <Tab.Screen name='Search' component={Search} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#00bfff',
                            height: Platform.OS === 'ios' ? 70 : 60,
                            width: Platform.OS === 'ios' ? 70 : 60,
                            top: Platform.OS === 'ios' ? -20 : -30,
                            borderRadius: Platform.OS === 'ios' ? 35 : 30,
                            borderWidth: 2,
                            borderColor: '#fff'
                        }}>
                            <Ionicons name="search-outline" size={24} color='#fff' />
                        </View>
                    )
                }
            }} />
            <Tab.Screen name='Upload' component={Upload} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <Ionicons name={focused ? icon.cloud_upload : icon.cloud_upload_outline} size={30} color={focused ? '#00bfff' : '#888886'} />
                    )
                }
            }} />
            <Tab.Screen name='Setting' component={Setting} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <Ionicons name={focused ? icon.settings : icon.settings_outline} size={30} color={focused ? '#00bfff' : '#888886'} />
                    )
                }
            }} />
        </Tab.Navigator>
    )
}

export default BottomNavigation