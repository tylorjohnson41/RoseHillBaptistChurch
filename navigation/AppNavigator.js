import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import BibleScreen from '../screens/BibleScreen';
import SermonsScreen from '../screens/SermonsScreen';
import GivingScreen from '../screens/GivingScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#ccc',
          tabBarStyle: {
            backgroundColor: '#0D1B2A',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            height: 70,
            paddingBottom: 10,
            paddingTop: 8,
            position: 'absolute',
            elevation: 10,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Events':
                iconName = 'calendar-outline';
                break;
              case 'Bible':
                iconName = 'book-outline';
                break;
              case 'Watch':
                iconName = 'play-circle-outline';
                break;
              case 'More':
                iconName = 'menu-outline';
                break;
                case 'Give':
                iconName = 'heart-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Bible" component={BibleScreen} />
        <Tab.Screen name="Watch" component={SermonsScreen} />
        <Tab.Screen name="Give" component={GivingScreen} />
        <Tab.Screen name="More"component={MoreScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}