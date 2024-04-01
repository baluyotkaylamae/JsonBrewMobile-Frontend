import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartActions';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const ProductCard = (props) => {
    const { name, price, images, description, rating } = props;
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

    // const handleAddToCart = () => {
    //   navigation.navigate('Product Detail')
    // };
    // const handleOrderNow = () => {
    //     navigation.navigate('Checkout');
    // };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}</Text>
            <Text style={styles.description}>{description}</Text>
            {/* <Text style={styles.rating}>Rating: {productRating}</Text> */}
            <Text style={styles.price}>₱{price}</Text>
            <View style={styles.buttonContainer}>
                {/* <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.orderButton]} onPress={handleOrderNow}>
                    <Text style={styles.buttonText}>Order Now</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.imageContainer}>
                <Swiper
                    style={styles.swiper}
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
                        />
                    ))}
                </Swiper>
                <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
                    <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={24} color={isLiked ? 'red' : 'black'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 200,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingBottom: 5,
    },
    imageContainer: {
        position: 'relative',
        width: '45%',
        height: 180,
        marginLeft: 150,
        marginTop: -145,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    image: {
        width: '100%',
        height: '250%',
        borderRadius: 0,
    },
    heartIcon: {
        position: 'absolute',
        top: 7,
        right: 7,
        zIndex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: -5,
        marginLeft: -200,
        color: 'black',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BF360C',
        textAlign: 'right',
        marginTop: 30,
        // marginRight: 5,
        marginLeft: -200,
        marginBottom: 5,
    },
    description: {
        fontSize: 13,
        textAlign: 'left',
        // marginHorizontal: 5,
        marginBottom: 5,
        marginTop: 10,
        marginLeft: -200,
        color: '#C4C4C4',
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
        width: '90%',
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
