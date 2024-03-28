import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartActions';
import { useNavigation } from '@react-navigation/native'; 

const { width } = Dimensions.get('window');

const ProductCard = (props) => {
    const { name, price, image, description, rating } = props;
    const [isLiked, setIsLiked] = useState(false);
    const [productRating, setProductRating] = useState(rating);
    const dispatch = useDispatch();
    const navigation = useNavigation(); 

    const toggleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            setProductRating(productRating + 1); 
           
        } else {
            setProductRating(productRating - 1); 
          
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            name: name,
            price: price,
            image: image,
            description: description,
            rating: rating,
            quantity: 1, 
            cupSize: 'Small', 
            sugarLevel: 'Medium', 
            addons: [], 
            totalPrice: price 
        }));
    };
    const handleOrderNow = () => {
        navigation.navigate('Checkout');
    };


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
                />
                <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
                    <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={24} color={isLiked ? 'red' : 'black'} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.rating}>Rating: {productRating}</Text>
            <Text style={styles.price}>₱{price}</Text>
            <View style={styles.buttonContainer}>
                     <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.orderButton]} onPress={handleOrderNow}>
                    <Text style={styles.buttonText}>Order Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#fff',
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
        top: 7,
        right: 7,
        zIndex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 5,
        marginLeft: -80,
        color: '#B99960',
    },
    price: {
        fontSize: 18,
        color: '#BF360C',
        textAlign: 'right',
        // marginRight: 5,
        marginLeft: -60,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        textAlign: 'left',
        // marginHorizontal: 5,
        marginBottom: 5,
        marginLeft: -60,
        color: '#616161',
    },
    rating: {
        fontSize: 14,
        textAlign: 'left',
        marginHorizontal: 5,
        marginBottom: 10,
        marginLeft: -60,
        color: '#616161',
    },
    buttonContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 0,
    },
    button: {
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 3,
        backgroundColor: '#664229',
        marginBottom: 5,
        minWidth: 100,
    },
    orderButton: {
        backgroundColor: '#B99960',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductCard;
