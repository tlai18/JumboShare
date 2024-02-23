import React from 'react';
import { FlatList, Text, ActivityIndicator, StyleSheet, View} from 'react-native';

import MealSwipeDetails from './MealSwipeDetails';

const MealSwipeFlatList = ({ isLoading, filteredMealSwipes }) => {
  return (
    isLoading ? (
      <ActivityIndicator/>
    ) : filteredMealSwipes.length > 0 ? (
      <FlatList
        data={filteredMealSwipes}
        keyExtractor={(mealswipe) => mealswipe._id}
        renderItem={({ item }) => <View style={styles.listItem}><MealSwipeDetails mealswipe={item} /></View>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    ) : (
      <Text style={{paddingLeft: 20}}>No meal swipe requests found.</Text>
    )
  );
};

export default MealSwipeFlatList;

const styles = StyleSheet.create({
        listItem: {
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: {
                                width: 0,
                                height: 4,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        borderRadius: 10,
                        
                        backgroundColor: 'white',
                        marginVertical: 4, // Adjust the margin as per your needs
                        // Add any additional styles you may need for each item
                
        },
      });