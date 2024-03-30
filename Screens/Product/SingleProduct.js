import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Heading, Center } from 'native-base';
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';

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
                    <Image
                        source={{
                            uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                        onError={() => console.log('Error loading image')}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Heading style={styles.contentHeader} size='xl'>{item.name}</Heading>
                    <Text style={styles.brandText}>{item.brand}</Text>
                    {selectedCupSize && ( // Check if cup size is selected before rendering
                        <Text style={styles.sizeText}>Size: <Text>{selectedCupSize}</Text></Text>
                    )}
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.availability}>
                        <Text style={styles.availabilityText}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.label}>Quantity:</Text>
                    <View style={styles.quantitySelector}>
                        <EasyButton primary small onPress={decreaseQuantity} style={{ backgroundColor: "#664229" }}>
                            <Text style={styles.buttonText}>-</Text>
                        </EasyButton>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <EasyButton primary small onPress={increaseQuantity} style={{ backgroundColor: "#664229" }}>
                            <Text style={styles.buttonText}>+</Text>
                        </EasyButton>
                    </View>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.label}>Select Sugar Level:</Text>
                    <View style={styles.optionsContainer}>
                        {['Low', 'Medium', 'High'].map(level => (
                            <TouchableOpacity
                                key={level}
                                style={[
                                    styles.option,

                                    selectedSugarLevel === level && styles.selectedOption
                                ]}
                                onPress={() => handleSugarLevelSelection(level)}
                            >
                                <Text style={styles.optionText}>{level}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.label}>Select Cup Size:</Text>
                    <View style={styles.optionsContainer}>
                        {['Small', 'Medium', 'Large'].map(size => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    styles.option,
                                    selectedCupSize === size && styles.selectedOption
                                ]}
                                onPress={() => handleCupSizeSelection(size)}
                            >
                                <Text style={styles.optionText}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.controlContainer}>
                    <Text style={styles.label}>Select Addons:</Text>
                    <View style={styles.optionsContainer}>
                        {['Milk', 'Honey', 'Cream'].map(addon => (
                            <TouchableOpacity
                                key={addon}
                                style={[
                                    styles.option,
                                    selectedAddons.includes(addon) && styles.selectedOption
                                ]}
                                onPress={() => handleAddonsSelection(addon)}
                            >
                                <Text style={styles.optionText}>{addon}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.addToCartContainer}>
                    <Text style={styles.label}>Total Price: ₱{totalPrice}</Text>
                    <EasyButton primary medium onPress={handleAddToCart} style={{ backgroundColor: "#664229" }}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </EasyButton>
                </View>
            </ScrollView>
        </Center >
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f7f3e9',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 300,
        // Ensure any additional styles needed for the Image component
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4a3f35',
    },
    brandText: {
        fontSize: 16,
        color: '#6b5b4d',
    },
    sizeText: {
        fontSize: 16,
        color: '#6b5b4d',
    },
    infoContainer: {
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
    controlContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
        color: '#4a3f35',
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
    buttonText: {
        color: "#fff",
    },
    sizeText: {
        fontSize: 16,
        color: '#6b5b4d',
    },

    addToCartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default SingleProduct;
