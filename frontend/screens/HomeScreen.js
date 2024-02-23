import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JumboShare</Text>
      
      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.missionText}>
        At JumboShare, our mission is to provide a seamless and convenient way for users to connect and share meal swipes. We strive to enhance the dining experience on campus and foster a sense of community among students.
      </Text>
      
      <Text style={styles.subtitle}>How to Use:</Text>
      <Text style={styles.instructions}>
        1. Create an account or log in to get started.
      </Text>
      <Text style={styles.instructions}>
        2. Navigate to the Meal Swipe section to view available meal swipes.
      </Text>
      <Text style={styles.instructions}>
        3. Filter the meal swipes based on your preferences.
      </Text>
      <Text style={styles.instructions}>
        4. Complete a meal swipe request or delete unwanted requests.
      </Text>
      <Text style ={styles.instructions}>
        5. Go to the form page to submit a meal swipe request
      </Text>
      <Text style={styles.instructions}>
        6. Use the Profile tab to manage your account settings.
      </Text>
      <Text style={styles.instructions}>
        7. Have a great experience with JumboShare!
      </Text>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  missionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 5,
  },

});

export default HomeScreen;
