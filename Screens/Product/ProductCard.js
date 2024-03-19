import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductCard = (props) => {
    const { name, price, image, description, rating } = props;
    const [isLiked, setIsLiked] = useState(false);
    const [productRating, setProductRating] = useState(rating);

    const toggleLike = () => {
        setIsLiked(!isLiked);
        // Update the ratings of the product
        if (!isLiked) {
            setProductRating(productRating + 1); // Increase the rating by 1
            // Here, you can implement the logic to update the ratings in the backend as well
        } else {
            setProductRating(productRating - 1); // Decrease the rating by 1
            // Similarly, update the ratings in the backend
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
                />
                {/* Responsive heart icon button */}
                <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
                    <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={24} color={isLiked ? 'red' : 'black'} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}</Text>
            <Text style={styles.price}>₱{price}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.rating}>Rating: {productRating}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    heartIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 5,
        marginLeft: 5,
        color: '#4E342E',
    },
    price: {
        fontSize: 18,
        color: '#BF360C',
        textAlign: 'right',
        marginRight: 5,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        textAlign: 'left',
        marginHorizontal: 5,
        marginBottom: 5,
        color: '#616161',
    },
    rating: {
        fontSize: 14,
        textAlign: 'left',
        marginHorizontal: 5,
        marginBottom: 10,
        color: '#616161',
    },
});

export default ProductCard;
