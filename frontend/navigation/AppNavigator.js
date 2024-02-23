import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import MealSwipeListScreen from '../screens/MealSwipeListScreen';
import ProfileScreen from '../screens/ProfileScreen'; 
import FormScreen from '../screens/FormScreen'
import { AuthContext } from '../context/AuthContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useAuthContext(AuthContext);

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
    
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'List') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Form') {
              iconName = focused ? 'create' : 'create-outline';
            }
    
            return <Ionicons name={iconName} size={size} color={"white"} />;
          },
          tabBarBackground: () => (<View style={{ backgroundColor: '#323b61', flex: 1 }}></View>),
        })}
  
    
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerTitleStyle: { opacity: 0 }, headerStyle: {
        backgroundColor: 'white'
        
      },       headerShadowVisible: false}} />
        <Tab.Screen name="List" component={MealSwipeListScreen} options={{headerTitleStyle: { opacity: 0 }, headerStyle: {
        backgroundColor: 'white'
        
      },       headerShadowVisible: false, // Remove the header line


}} />
        <Tab.Screen name="Form" component={FormScreen} options={{headerTitleStyle: { opacity: 0 }, headerStyle: {
        backgroundColor: 'white'
      },       headerShadowVisible: false, // Remove the header line

}} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerTitleStyle: { opacity: 0 }, headerStyle: {
        backgroundColor: 'white'
      },       headerShadowVisible: false, // Remove the header line

}} />

      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
          <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false}} />

          </>
        ) : (
          <>
            {/* <Stack.Screen name="Login" component={LoginScreen}  /> */}
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
