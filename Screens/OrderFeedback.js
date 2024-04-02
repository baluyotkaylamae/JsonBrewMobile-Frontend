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
            console.log('Response data:', response.data); // Add this line
    
            const data = response.data;
            if (data.success) {
                const reviewsData = data.reviews.map(review => ({
                    _id: review._id,
                    rating: review.rating,
                    comment: review.comment,
                    userName: review.userName,
                    date: review.date,
                    products: review.products
                }));
                setReviews(reviewsData);
            } else {
                console.error('Error fetching order reviews:', data.message);
            }
        } catch (error) {
            console.error('Error fetching order reviews:', error);
            setReviews([]);
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
                    <Text style={styles.comment}>{item.comment}</Text>
                    <Text style={styles.productNames}>Bought: </Text>
                    {item.products.map((productName, index) => (
                        <Text key={index} style={styles.productName}>{productName}</Text>
                    ))}
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
    productName: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
    },
    productNames: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 12,
        textAlign: 'center', 
    }
});

export default OrderFeedback;
