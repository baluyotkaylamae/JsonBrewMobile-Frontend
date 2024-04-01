import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../assets/common/baseurl';
import axios from 'axios';

const OrderFeedback = ({ orderId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchOrderReviews();
    }, []);

    const fetchOrderReviews = async () => {
        try {
            const token = await AsyncStorage.getItem("jwt");
            const response = await axios.get(`${baseURL}reviews/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data;
            if (data.success) {
                // Sort the reviews by date timestamp in descending order (newest first)
                const sortedReviews = data.reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
                // Reverse the order to display newest reviews at the top
                const reversedReviews = sortedReviews.reverse();
                setReviews(reversedReviews);
            } else {
                console.error('Error fetching order reviews:', data.message);
            }
        } catch (error) {
            console.error('Error fetching order reviews:', error);
        }
    };

    const renderItem = ({ item }) => {
        // Convert rating number to a star representation
        const renderStars = () => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= item.rating) {
                    stars.push(<Text key={i} style={styles.star}>★</Text>);
                } else {
                    stars.push(<Text key={i} style={styles.star}>☆</Text>);
                }
            }
            return stars;
        };

        // Format the review date
        const reviewDate = new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return (
            <View style={styles.reviewItem}>
                <View style={styles.userInfo}>
                    <Text style={styles.userNames}>{item.userName}</Text>
                </View>
                <Text style={styles.reviewDate}>{reviewDate}</Text>

                <View style={styles.ratingContainer}>
                        {renderStars()}
                    </View>
               
                <View style={styles.reviewDetails}>
                <Text style={styles.orderId}>Order ID: {item.order._id}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Customer Feedbacks</Text>
            {reviews.length > 0 ? (
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                />
            ) : (
                <Text>No customer feedback.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        textTransform: 'uppercase'


    },
    reviewItem: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    star: {
        fontSize: 40,
        marginRight: 5,
        color: '#EDE845',
    },
    comment: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center', 
    },
    userNames: {
        fontSize: 20,
        fontWeight: '800',
        textTransform: 'uppercase'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewDetails: {
        flex: 1,
    },
    reviewDate: {
        textAlign: 'center',
        marginTop: 10,
    },
    orderId:
    {
        textAlign: 'center',
    }
});

export default OrderFeedback;
