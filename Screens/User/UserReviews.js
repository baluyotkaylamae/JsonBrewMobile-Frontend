import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from "../../assets/common/baseurl";
import axios from "axios";

const UserReviews = ({ route, navigation }) => {
    const { orderId } = route.params; // Remove orderItemId from route.params
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');

    const handleSubmitReview = async () => {
      try {
          if (!validateRating()) {
              setError('Please enter a rating between 1 and 5.');
              return;
          }
  
          const token = await AsyncStorage.getItem("jwt");
          await axios.post(
            `${baseURL}reviews`,
            { orderId, rating, review }, // Ensure the keys match backend expectations
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
          
          navigation.goBack();
      } catch (error) {
          console.error('Error submitting review:', error);
          console.error('Request data:', { orderId, review, rating });
          if (error.response) {
              console.error('Server responded with status:', error.response.status);
              console.error('Server response data:', error.response.data);
          } else if (error.request) {
              console.error('No response received:', error.request);
          } else {
              console.error('Error message:', error.message);
          }
          Alert.alert('Error', 'Failed to submit review. Please try again.');
      }
  };
  

    const validateRating = () => {
        const parsedRating = parseInt(rating);
        return !isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 5;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Write Your Review</Text>
            {orderId ? (
                <Text style={styles.orderIdText}>Order ID: <Text>{orderId}</Text></Text>
            ) : (
                <Text style={styles.orderIdText}>Order ID not available</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Rating (1-5)"
                value={rating}
                onChangeText={text => setRating(text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                multiline
                placeholder="Enter your review here"
                value={review}
                onChangeText={text => setReview(text)}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Submit Review" onPress={handleSubmitReview} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderIdText: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default UserReviews;
