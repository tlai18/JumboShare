import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MealSwipeFlatList } from '../components/MealSwipeFlatList'

import { useAuthContext } from '../hooks/useAuthContext';
import { useIsFocused } from '@react-navigation/native';

import { useLogout } from '../hooks/useLogout';

const ProfileScreen = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [mealswipes, setMealswipes] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchMealSwipes = async () => {
      try {
        const response = await fetch('http://10.0.0.3:4000/api/user/history', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setMealswipes(json)
        }
      } catch (error) {
        console.error('Error fetching meal swipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && isFocused) {
      fetchMealSwipes();
    }
  }, [mealswipes, user, isFocused]);

  const handleClick = () => {
    logout();
  };

  return user && (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.subtitle}>Welcome to your profile!</Text>
      <Text style={styles.emailText}>{user.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleClick}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Text>{mealswipes}</Text>
      {/* <MealSwipeFlatList isLoading={isLoading} filteredMealSwipes={mealswipes} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  emailText: {
    fontSize: 14,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

  

  