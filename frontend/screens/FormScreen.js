import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealSwipeForm from '../components/MealSwipeForm' 

const FormScreen = ({}) => {
  return (
    <View style={styles.container}>
          <MealSwipeForm/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
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
});

export default FormScreen;
