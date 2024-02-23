import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const MealSwipeFilter = ({ handleFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleClick = (filter) => {
    let updatedFilters = [...activeFilters];
    if (updatedFilters.includes(filter)) {
      // Filter already exists, remove it from the activeFilters array
      updatedFilters = updatedFilters.filter((f) => f !== filter);
    } else {
      // Filter does not exist, add it to the activeFilters array
      updatedFilters.push(filter);
    }
    setActiveFilters(updatedFilters);
    handleFilterChange(updatedFilters);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleClick('Dewick')}
        style={[
          styles.filterButton,
          activeFilters.includes('Dewick') && styles.activeFilterButton,
        ]}
      >
        <Text style={[styles.filterText, activeFilters.includes('Dewick') && styles.activeFilterText]}>Dewick</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick('Carm')}
        style={[
          styles.filterButton,
          activeFilters.includes('Carm') && styles.activeFilterButton,
        ]}
      >
        <Text style={[styles.filterText, activeFilters.includes('Carm') && styles.activeFilterText]}>Carm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick('Hodge')}
        style={[
          styles.filterButton,
          activeFilters.includes('Hodge') && styles.activeFilterButton,
        ]}
      >
        <Text style={[styles.filterText, activeFilters.includes('Hodge') && styles.activeFilterText]}>Hodge</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick('Kindlevan')}
        style={[
          styles.filterButton,
          activeFilters.includes('Kindlevan') && styles.activeFilterButton,
        ]}
      >
        <Text style={[styles.filterText, activeFilters.includes('Kindlevan') && styles.activeFilterText]}>Kindlevan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginVertical: 20,
    paddingHorizontal: 8,
    marginLeft: 10
  },

  filterButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
  },

  activeFilterButton: {
    backgroundColor: '#3F51B5',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  activeFilterText: {
    color: '#FFF',
  },
});

export default MealSwipeFilter;
