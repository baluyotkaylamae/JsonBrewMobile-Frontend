import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
} from "react-native";
import { Select, Box } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseurl";
import Error from "../../Shared/Error";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import mime from "mime";

const ProductForm = (props) => {
    const [pickerValue, setPickerValue] = useState("");
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [item, setItem] = useState(null);

    let navigation = useNavigation();

    useEffect(() => {
        if (!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            setCategory(props.route.params.item.category._id);
            setPickerValue(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());
            setImages(props.route.params.item.images || []);
        }
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));
        axios
            .get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert("Error to load categories"));
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
        return () => {
            setCategories([]);
        };
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true, // Allow multiple image selection
        });

        if (!result.cancelled) {
            setImages(result.assets.map((asset) => asset.uri)); // Store URIs of selected images
        }
    };

    const addProduct = () => {
        if (
            name === "" ||
            brand === "" ||
            price === "" ||
            description === "" ||
            category === "" ||
            countInStock === "" ||
            images.length === 0
        ) {
            setError("Please fill in the form correctly");
            return;
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        images.forEach((uri) => {
            formData.append("images", {
                uri: uri,
                type: mime.getType(uri),
                name: uri.split("/").pop(),
            });
        });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        if (item !== null) {
            axios
                .put(`${baseURL}products/${item.id}`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Product successfully updated",
                            text2: "",
                        });
                        setTimeout(() => {
                            navigation.navigate("Products");
                        }, 500);
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again",
                    });
                });
        } else {
            axios
                .post(`${baseURL}products`, formData, config)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New Product added",
                            text2: "",
                        });
                        setTimeout(() => {
                            navigation.navigate("Products");
                        }, 500);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again",
                    });
                });
        }
    };

    return (
        <FormContainer title="Add Product">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    {images.map((uri, index) => (
                        <Image
                            key={index}
                            style={styles.image}
                            source={{ uri }}
                        />
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <Icon style={{ color: "white" }} name="camera" />
            </TouchableOpacity>
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
            </View>
            <Input
                placeholder="Brand"
                name="brand"
                id="brand"
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Name</Text>
            </View>
            <Input
                placeholder="Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Price</Text>
            </View>
            <Input
                placeholder="Price"
                name="price"
                id="price"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrice(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>
                    Count in Stock
                </Text>
            </View>
            <Input
                placeholder="Stock"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>
                    Description
                </Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Box>
                <Select
                    minWidth="90%"
                    placeholder="Select your Category"
                    selectedValue={pickerValue}
                    onValueChange={(e) => [
                        setPickerValue(e),
                        setCategory(e),
                    ]}
                >
                    {categories.map((c, index) => {
                        return (
                            <Select.Item
                                key={c.id}
                                label={c.name}
                                value={c.id}
                            />
                        );
                    })}
                </Select>
            </Box>

            {error ? <Error message={error} /> : null}
            <View style={styles.buttonContainer}>
                <EasyButton
                    large
                    primary
                    onPress={() => addProduct()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </EasyButton>
            </View>
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10,
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
    },
    imageContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    imagePicker: {
        backgroundColor: "grey",
        padding: 5, // Adjust padding to make it smaller
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 50, // Adjust width
        height: 50, // Adjust height
        marginRight: 10,
    },
});

export default ProductForm;
