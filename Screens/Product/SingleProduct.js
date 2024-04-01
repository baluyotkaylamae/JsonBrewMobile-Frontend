import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Heading, Center, VStack } from 'native-base';
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';
import Divider from "../../Shared/StyledComponents/Divider";
import Swiper from "react-native-swiper";


const SingleProduct = ({ route }) => {
    const [item, setItem] = useState(route.params.item);
    const [availability, setAvailability] = useState('');
    const [availabilityText, setAvailabilityText] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedSugarLevel, setSelectedSugarLevel] = useState("Medium"); // Set default sugar level
    const [selectedCupSize, setSelectedCupSize] = useState("Small"); // Set default cup size
    const [selectedAddons, setSelectedAddons] = useState([]);

    useEffect(() => {
        let newAvailability, newText;
        if (item.countInStock === 0) {
            newAvailability = <TrafficLight unavailable />;
            newText = "Unavailable";
        } else if (item.countInStock <= 5) {
            newAvailability = <TrafficLight limited />;
            newText = "Limited Stock";
        } else {
            newAvailability = <TrafficLight available />;
            newText = "Available";
        }
        setAvailability(newAvailability);
        setAvailabilityText(newText);

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, []);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Calculate addon prices
        let addonPrice = selectedAddons.length * 5;

        // Calculate cup size price
        let cupSizePrice = 0;
        if (selectedCupSize === "Medium") {
            cupSizePrice = 10;
        } else if (selectedCupSize === "Large") {
            cupSizePrice = 20;
        }

        // Calculate sugar level price
        let sugarLevelPrice = 0;
        if (selectedSugarLevel !== "Medium") {
            sugarLevelPrice = 5;
        }

        // Calculate total price with quantity
        const totalPrice = ((item.price + cupSizePrice + sugarLevelPrice + addonPrice) * quantity).toFixed(2);

        dispatch(addToCart({
            ...item,
            quantity: quantity,
            cupSize: selectedCupSize,
            sugarLevel: selectedSugarLevel,
            addons: selectedAddons,
            totalPrice: totalPrice
        }));

        Toast.show({
            topOffset: 60,
            type: "success",
            text1: `${item.name} added to Cart`,
            text2: "Go to your cart to complete the order"
        });
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleSugarLevelSelection = (level) => {
        setSelectedSugarLevel(level);
    };

    const handleCupSizeSelection = (size) => { // Function to handle cup size selection
        setSelectedCupSize(size);
    };

    const handleAddonsSelection = (addon) => {
        const newSelectedAddons = [...selectedAddons];
        const index = newSelectedAddons.indexOf(addon);
        if (index === -1) {
            newSelectedAddons.push(addon);
        } else {
            newSelectedAddons.splice(index, 1);
        }
        setSelectedAddons(newSelectedAddons);
    };
    const totalPrice = ((item.price + (selectedCupSize === "Medium" ? 10 : (selectedCupSize === "Large" ? 20 : 0)) + (selectedSugarLevel !== "Medium" ? 5 : 0) + (selectedAddons.length * 5)) * quantity).toFixed(2);

    return (
        <Center flexGrow={1}>
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                    <Swiper
                        style={styles.swiper}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {item.images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                resizeMode="contain"
                                style={styles.image}
                                onError={() => console.log('Error loading image')}
                            />
                        ))}
                    </Swiper>
                </View>
                <View style={styles.contentContainer}>
                    <Heading style={styles.contentHeader} size='xl'>{item.name}</Heading>
                    <Text style={styles.brandText}>{item.brand}</Text>
                    {selectedCupSize && (
                        <Text style={[styles.sizeText, { fontSize: 15 }]}>Size: <Text>{selectedCupSize}</Text></Text>
                    )}
                    <View style={styles.availability}>
                        <Text style={styles.availabilityText}>
                            {availabilityText}
                        </Text>
                        {availability}
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.quanlabelContainer}>
                    <Text style={styles.description}>Quantity:</Text>
                </View>
                <View style={styles.controlContainer}>
                    <View style={styles.quantitySelector}>
                        <EasyButton primary small onPress={decreaseQuantity}>
                            <Text style={styles.buttonText}>-</Text>
                        </EasyButton>
                        <View style={styles.quantityContainer}>
                            <Text style={styles.quantity}>{quantity}</Text>
                        </View>
                        <EasyButton primary small onPress={increaseQuantity}>
                            <Text style={styles.buttonText}>+</Text>
                        </EasyButton>
                    </View>
                </View>
                <Divider />
                <View style={styles.sugarlabelContainer}>
                    <Text style={styles.description}>Select Sugar Level:</Text>
                </View>
                <View style={[styles.boxchoicesContainer]}>
                    {['Low', 'Medium', 'High'].map(level => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.option,
                                selectedSugarLevel === level && styles.selectedOption,
                                { width: 104, justifyContent: 'center' } // Align the text vertically center
                            ]}
                            onPress={() => handleSugarLevelSelection(level)}
                        >
                            <Text style={[styles.optionText, { textAlign: 'center' }]}>
                                {level}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Divider />
                <View style={styles.cuplabelContainer}>
                    <Text style={styles.description}>Select Cup Size:</Text>
                </View>
                <View style={styles.controlContainer}>
                    <View style={styles.optionsContainer}>
                        {['Small', 'Medium', 'Large'].map(size => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    styles.option,
                                    selectedCupSize === size && styles.selectedOption,
                                    { width: 104, justifyContent: 'center' } // Align the text vertically center
                                ]}
                                onPress={() => handleCupSizeSelection(size)}
                            >
                                <Text style={[styles.optionText, { textAlign: 'center' }]}>
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <Divider />
                <View style={styles.addonslabelContainer}>
                    <Text style={styles.description}>Select Addons:</Text>
                </View>
                <View style={styles.controlContainer}>
                    <View style={styles.optionsContainer}>
                        {['Milk', 'Honey', 'Cream'].map(addon => (
                            <TouchableOpacity
                                key={addon}
                                style={[
                                    styles.option,
                                    selectedAddons.includes(addon) && styles.selectedOption,
                                    { width: 104, justifyContent: 'center' } // Align the text vertically center
                                ]}
                                onPress={() => handleAddonsSelection(addon)}
                            >
                                <Text style={[styles.optionText, { textAlign: 'center' }]}>
                                    {addon}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
            <VStack style={styles.addToCartContainer}>
                <Text style={styles.label}><Text style={{ fontWeight: 'bold' }}>Amount:</Text>                                                  ${totalPrice}</Text>
                <View style={styles.buttonContainer}>
                    <EasyButton cart medium onPress={handleAddToCart}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </EasyButton>
                </View>
            </VStack>
        </Center >

    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '5%', // Adjust percentage as needed
        paddingHorizontal: '18%',
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginLeft: -60,
        marginBottom: 20,
    },
    image: {
        flex: 1,
        borderRadius: 10, // Add border radius for a rounded look
        marginHorizontal: 10, // Add margin for spacing between images
    },
    contentContainer: {
        width: '100%',
        alignItems: 'left',
        marginTop: -15,
        marginLeft: -100,
        marginBottom: 20,
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 3,
        color: '#4a3f35',
        fontSize: 25,
    },
    brandText: {
        fontSize: 15,
        color: '#6b5b4d',
    },
    sizeText: {
        fontSize: 16,
        color: '#6b5b4d',
    },
    infoContainer: {
        marginLeft: -375,
        marginTop: -10,
        marginBottom: 20,
    },
    availability: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    availabilityText: {
        marginRight: 10,
        color: '#6b5b4d',
    },
    description: {
        textAlign: 'center',
        color: '#4a3f35',
        marginBottom: 20,
    },
    quanlabelContainer: {
        marginBottom: -17,
        marginLeft: -360,
    },
    controlContainer: {
        marginLeft: -85,
        marginBottom: 20,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
        color: '#4a3f35',
    },
    quantityContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        minWidth: 240,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#4a3f35',
    },
    sugarlabelContainer: {
        marginTop: 17,
        marginBottom: -25,
        marginLeft: -300,
    },
    SugarContainer: {
        marginLeft: -200,
        marginTop: 10,
        marginBottom: 20,
    },
    boxchoicesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: -80,
        marginBottom: 25,
    },
    cuplabelContainer: {
        marginTop: 17,
        marginBottom: -15,
        marginLeft: -320,
    },
    addonslabelContainer: {
        marginTop: 17,
        marginBottom: -15,
        marginLeft: -320,
    },
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    option: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
        color: '#4a3f35',
    },
    selectedOption: {
        backgroundColor: '#e0e0e0',
    },
    sizeText: {
        fontSize: 16,
        color: '#6b5b4d',
    },

    addToCartContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: -10,
        marginBottom: 80,
    },
    Easybutton: {
        width: '100%', // Set the width of the button
        borderRadius: 30, // Set the border radius to make it rounded
    },
    buttonText: {
        color: "#fff",
        textAlign: 'center',
    },
});

export default SingleProduct;
