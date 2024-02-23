import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMealSwipesContext } from "../hooks/useMealSwipesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ConfirmationModal from './ConfirmationModal';
import { formatDistanceToNow } from 'date-fns';


const MealSwipeDetails = ({ mealswipe }) => {
  const { dispatch } = useMealSwipesContext();
  const { user } = useAuthContext();
  const { name, year, major, location, time, note, complete } = mealswipe;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDeleteClick = async () => {
    if (!user) { // check if logged in
      return;
    }

    const response = await fetch(`http://192.168.1.151:4000/api/mealswipes/${mealswipe._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MEALSWIPE", payload: json });
    }
  };

  const handleCompleteClick = () => {
    setShowConfirmationModal(true);

  };

  const handleHideClick = () => {
    setExpanded(false);
  };

  const handleCompleteConfirmation = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`http://192.168.1.151:4000/api/mealswipes/${mealswipe._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ complete: true })
    });

    const json = await response.json();

 
    if (response.ok) {
      console.log('MealSwipe added to user history successfully');

      dispatch({ type: "UPDATE_MEALSWIPE", payload: json });
    }

    setShowConfirmationModal(false);
  };

  const handleUndoClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`http://192.168.1.151:4000/api/mealswipes/${mealswipe._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ complete: false })
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_MEALSWIPE", payload: json });
    }
  };

  return (
    <View style={[styles.container, complete && styles.completedContainer]}>
      <View style={styles.infoContainer}>
        {!expanded && (
          <>
            <View style={styles.detailsContainer}>
            <Text style={styles.label}>Location: </Text>
            <Text style={styles.details}>{location}</Text>
            </View>
            <View style={styles.detailsContainer}>
            <Text style={styles.label}>Time: </Text>
            <Text style={styles.details}>{time}</Text>
            </View>
            <View style={styles.detailsContainer}>
            <Text style={styles.details}>Posted: {formatDistanceToNow(new Date(mealswipe.createdAt), { addSuffix: true })}</Text>
            </View>
          </>
        )}
        {expanded && (
          <>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Major: </Text>
              <Text style={styles.details}>{major}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Year: </Text>
              <Text style={styles.details}>{year}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Location: </Text>
              <Text style={styles.details}>{location}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Time: </Text>
              <Text style={styles.details}>{time}</Text>
            </View>
            {note && <View style={styles.detailsContainer}>
              <Text style={styles.label}>Note: </Text>
              <Text style={styles.details}>{time}</Text>
            </View>}
          </>
        )}
      </View>
  
      {expanded && (
        <View style={styles.column}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.toggleButton, complete && styles.completeButton]}
            onPress={() => (complete ? handleUndoClick() : handleCompleteClick())}
          >
            <Text style={styles.actionButtonText}>{complete ? 'Undo' : 'Complete'}</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteClick()}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity
            style={[styles.actionButton, styles.hideButton]}
            onPress={() => handleHideClick()}
          >
            <Text style={styles.actionButtonText}>Hide</Text>
          </TouchableOpacity>
        </View>
      )}
  
      {!expanded && (
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => setExpanded(true)}
        >
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
      )}
  
      <ConfirmationModal
        visible={showConfirmationModal}
        onConfirm={handleCompleteConfirmation}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  completedContainer: {
    backgroundColor: '#e6e6e6',
  },
  
  infoContainer: {
    flex: 1,
    margin: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginVertical: 10,

  },
  column : {
    flexDirection: 'column',
    

  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
  },
  completeButton: {
    backgroundColor: '#8BC34A',
  },
  viewButton: {
    backgroundColor: '#3F51B5',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  hideButton: {
    backgroundColor: '#3F51B5',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',

  },
});

export default MealSwipeDetails;
