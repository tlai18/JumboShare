import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import { useMealSwipesContext } from "../hooks/useMealSwipesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { ScrollView } from 'react-native-gesture-handler';

const MealSwipeForm = () => {
  const { dispatch } = useMealSwipesContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in")
      return
    }

    // Set name, year, and major to "n/a" if they are blank
    const updatedName = name.trim() !== "" ? name : "anonymous";
    const updatedYear = year.trim() !== "" ? year : "n/a";
    const updatedMajor = major.trim() !== "" ? major : "n/a";
    const updatedNote = note.trim() !== "" ? note : "n/a";

    const mealswipe = {
      name: updatedName,
      year: updatedYear,
      major: updatedMajor,
      location,
      time,
      note: updatedNote,
      complete: false,
    };

    const response = await fetch('http://192.168.1.151:4000/api/mealswipes', {
      method: 'POST',
      body: JSON.stringify(mealswipe),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('');
      setYear('');
      setMajor('');
      setLocation('');
      setTime('');
      setNote('');

      setError(null)
      setEmptyFields([])

      console.log('new mealswipe added', json)
      dispatch({ type: 'CREATE_MEALSWIPE', payload: json })
    }
  }

  const renderYearButton = (label) => (
    <TouchableOpacity
      style={[
        styles.button,
        year === label && styles.selectedButton,
      ]}
      onPress={() => setYear(label)}
    >
      <Text style={year === label ? styles.selectedText: styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const renderLocationButton = (label) => (
    <TouchableOpacity
      style={[
        styles.button,
        location === label && styles.selectedButton,
      ]}
      onPress={() => setLocation(label)}
    >
      <Text style={location === label ? styles.selectedText: styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Text style={styles.formTitle}>Request</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Anonymous"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Year</Text>
        <View style={styles.buttonsContainer}>
          {renderYearButton('Freshman')}
          {renderYearButton('Sophomore')}
          {renderYearButton('Junior')}
          {renderYearButton('Senior')}
          {renderYearButton('Grad')}
        </View>

        <Text style={[styles.label]}>Location*</Text>
        <View style={[styles.buttonsContainer, emptyFields.includes("location") && { borderColor: 'red', borderWidth: 1, borderRadius: 20 }]}>
          {renderLocationButton('Dewick')}
          {renderLocationButton('Carm')}
          {renderLocationButton('Hodge')}
          {renderLocationButton('Kindlevan')}
        </View>

        <Text style={styles.label}>Major</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Computer Science"
          placeholderTextColor="#888"
          value={major}
          onChangeText={setMajor}
        />

        <Text style={styles.label}>Time*</Text>
        <TextInput
          style={[styles.input, emptyFields.includes('time') && { borderColor: 'red' }]}
          placeholder="Time"
          placeholderTextColor="#888"
          value={time}
          onChangeText={setTime}
        />

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.input}
          placeholder="pls help im starving"
          placeholderTextColor="#888"
          value={note}
          onChangeText={setNote}
        />

        <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
          <Text style={styles.selectedText}>Add Meal Swipe</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
  },
  
  
  formTitle: {
    color: '#000',
    fontSize: 36,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
  },

  selectedButton: {
    backgroundColor: '#3F51B5',
    color: 'white'
  },

  createButton: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectedText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },


  
  

  

  

 
});

export default MealSwipeForm;
