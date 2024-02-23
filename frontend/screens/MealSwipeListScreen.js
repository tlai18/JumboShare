import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMealSwipesContext } from '../hooks/useMealSwipesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useIsFocused } from '@react-navigation/native';
import SmileyModal from '../components/SmileyModal';
import ClockModal from '../components/ClockModal';

import { Octicons } from '@expo/vector-icons'; 

import MealSwipeFilter from '../components/MealSwipeFilter';
import MealSwipeFlatList from '../components/MealSwipeFlatList';

const MealSwipeListScreen = () => {
  const { mealswipes, dispatch } = useMealSwipesContext();
  const { user } = useAuthContext();

  const isFocused = useIsFocused();
  const [showSmileyModal, setShowSmileyModal] = useState(false);
  const [showClockModal, setShowClockModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [locationArray, setLocationArray] = useState([]);

  useEffect(() => {
    const fetchMealSwipes = async () => {
      try {
        const response = await fetch('http://192.168.1.151:4000/api/mealswipes', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          dispatch({ type: 'SET_MEALSWIPES', payload: json });
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
  }, [dispatch, user, isFocused]);

  const handleFilterChange = (filters) => {
    setLocationArray(filters);
  };

  const getFilteredMealSwipes = () => {
    if (!mealswipes || mealswipes.length === 0) {
      return [];
    }

    return mealswipes.filter((mealswipe) => {
      const locationMatches =
        locationArray.length === 0 ||
        locationArray.some(
          (filter) => mealswipe.location.toLowerCase() === filter.toLowerCase()
        );

      return locationMatches;
      // const isNotComplete = !mealswipe.complete;
      // return locationMatches && isNotComplete;

    });
  };

  const filteredMealSwipes = getFilteredMealSwipes();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.row}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.iconContainer}>
          <Octicons name="smiley" size={24} color="gold" onPress={() => setShowSmileyModal(true)}/>
          <View style={styles.margin} />
          <Octicons name="clock" size={24} color="indigo" onPress={() => setShowClockModal(true)}/>
        </View>
      </View>
      <Text style={styles.subtitle}>Based on your preferences...</Text>
    </View>
        <MealSwipeFilter handleFilterChange={handleFilterChange} />
        <MealSwipeFlatList isLoading={isLoading} filteredMealSwipes={filteredMealSwipes} />
        <SmileyModal
        visible={showSmileyModal}
        onConfirm={null}
        onCancel={() => setShowSmileyModal(false)}
      /><ClockModal
      visible={showClockModal}
      onConfirm={null}
      onCancel={() => setShowClockModal(false)}
    />
    </View>
  );
};

export default MealSwipeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
  
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: '#000',
    fontSize: 36,
    fontWeight: '700',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  subtitle: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  margin: {
    width: 10
  }
});



