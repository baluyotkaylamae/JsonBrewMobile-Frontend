import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from "../../assets/common/baseurl";
import axios from "axios";

const UserReviews = ({ route, navigation }) => {
    const { orderId } = route.params;
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');
    const [existingReviewId, setExistingReviewId] = useState(null);

    useEffect(() => {
        // Fetch review data for the provided order ID when the component mounts
        if (orderId) {
            fetchReviewData(orderId);
        }
    }, [orderId]);

    const fetchReviewData = async (orderId) => {
        try {
            const token = await AsyncStorage.getItem("jwt");
            const response = await axios.get(`${baseURL}reviews`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { orderId: orderId }
            });

            if (response.data.success) {
                const reviews = response.data.reviews;
                if (reviews.length > 0) {
                    const { _id, comment, rating } = reviews[0];
                    setExistingReviewId(_id); // Set the existing review ID if review exists
                    setReview(comment);
                    setRating(rating.toString()); // Convert rating to string
                }
            } else {
                // Handle error response
                console.error('Error fetching review data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching review data:', error);
        }
    };

    const handleSubmitReview = async () => {
        try {
            if (!validateRating()) {
                setError('Please enter a rating between 1 and 5.');
                return;
            }
    
            const token = await AsyncStorage.getItem("jwt");
            if (existingReviewId) {
                // If existing review, perform update
                await axios.put(
                    `${baseURL}reviews/${existingReviewId}`,
                    { rating, comment: review }, // Updated to send 'comment' instead of 'review'
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // If no existing review, perform creation
                await axios.post(
                    `${baseURL}reviews`,
                    { orderId, rating, comment: review }, // Ensure to send 'rating' and 'comment' correctly
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
    
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
            <Button title={existingReviewId ? "Update Review" : "Submit Review"} onPress={handleSubmitReview} />
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
