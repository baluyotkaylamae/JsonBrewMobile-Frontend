import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import { Button, Center } from "native-base";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import HeaderReg from "../../Shared/HeaderReg";
import RegGreeting from "../../Shared/RegGreeting";
import Error from "../../Shared/Error";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import Toast from "react-native-toast-message";
import { Camera } from 'expo-camera';
import Icon from "react-native-vector-icons/FontAwesome"
import mime from "mime";
import * as ImagePicker from "expo-image-picker"
import InputUser from "../../Shared/Form/InputUser";
import * as Google from "expo-auth-session/providers/google";

var { height, width } = Dimensions.get("window")

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [launchCam, setLaunchCam] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const navigation = useNavigation()
    const [userInfo, setUserInfo] = useState(null);

    //google
    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     androidClientId: "271452028008-e7h9gm30q42bemt4umn54jhmb222ksq5.apps.googleusercontent.com",
    //     iosClientId: "",
    //     webClientId: "271452028008-44pgshqf63a08nq4l8okqo5pk2oho2mp.apps.googleusercontent.com",
    //   });

    // const addPhoto = async () => {
    //     setLaunchCam(true)
    //     if (camera) {
    //         const data = await camera.takePictureAsync(null)
    //         setImage(data.uri);
    //         setMainImage(data.uri)
    //         setLaunchCam(false)
    //     }
    // }
    const takePhoto = async () => {
        setLaunchCam(true)

        const c = await ImagePicker.requestCameraPermissionsAsync();

        if (c.status === "granted") {
            let result = await ImagePicker.launchCameraAsync({
                aspect: [4, 3],
                quality: 1,
            });
            console.log(result)

            // setImage(data.uri);
            // setMainImage(data.uri)
            if (!result.canceled) {
                console.log(result.assets)
                setMainImage(result.assets[0].uri);
                setImage(result.assets[0].uri);
            }
        }
    };

    const register = () => {
        if (email === "" || name === "" || phone === "" || password === "") {
            setError("Please fill in the form correctly");
        }
        // let user = {
        //     name: name,
        //     email: email,
        //     password: password,
        //     phone: phone,
        //     isAdmin: false,
        //   };
        //   axios
        //     .post(`${baseURL}users/register`, user)
        //     .then((res) => {
        //       if (res.status == 200) {
        //         Toast.show({
        //           topOffset: 60,
        //           type: "success",
        //           text1: "Registration Succeeded",
        //           text2: "Please Login into your account",
        //         });
        //         setTimeout(() => {
        //           navigation.navigate("Login");
        //         }, 500);
        //       }
        //     })
        //     .catch((error) => {
        //       Toast.show({
        //         position: 'bottom',
        //         bottomOffset: 20,
        //         type: "error",
        //         text1: "Something went wrong",
        //         text2: "Please try again",
        //       });
        //     });
        let formData = new FormData();
        const newImageUri = "file:///" + image.split("file:/").join("");


        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("isAdmin", false);
        formData.append("image", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",

            }
        }
        axios
            .post(`${baseURL}users/register`, formData, config)
            .then((res) => {
                if (res.status === 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: "Please Login into your account",
                    });
                    setTimeout(() => {
                        navigation.navigate("Login");
                    }, 500);
                }
            })
            .catch((error) => {
                Toast.show({
                    position: 'bottom',
                    bottomOffset: 20,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
                console.log(error.message)
            })
    }

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    return (
        <KeyboardAwareScrollView
            style={{ height: '80%' }}
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            backgroundColor={"#FFFFFF"}
        >
            <HeaderReg />
            <RegGreeting />
            <FormContainer>

                <InputUser
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <InputUser
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                <InputUser
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <InputUser
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                {launchCam ?
                    <Center width={width} >
                        <View style={styles.cameraContainer}>
                            <Camera
                                ref={ref => setCamera(ref)}
                                style={styles.fixedRatio}
                                type={type}
                                ratio={'1:1'} />

                        </View>

                        <View style={[styles.buttonRow, {
                            marginLeft: 20,
                            marginBottom: 20,
                        }]}>
                            <Button
                                style={{
                                    backgroundColor: 'white',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    marginRight: 10,
                                    borderWidth: 1,
                                    borderColor: '#664229',
                                }}
                                variant={"ghost"}
                                onPress={() => takePhoto()}>
                                <Text>Add Photo</Text>
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: 'white',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#664229',
                                }}
                                variant={"ghost"}
                                onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                    );
                                }}>
                                <Text>Flip Camera</Text>
                            </Button>
                        </View>

                    </Center> : null}

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: mainImage }} />
                    <TouchableOpacity
                        onPress={takePhoto}
                        style={styles.imagePicker}>
                        <Icon style={{ color: "white" }} name="camera" />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <EasyButton
                        login
                        primary
                        onPress={() => register()}
                        style={styles.loginButton}
                    ><Text style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}>Sign up</Text>
                    </EasyButton>
                    {/* <Button variant={"ghost"} onPress={() => register()}>
                        <Text style={{ color: "blue" }}>Register</Text>
                    </Button> */}
                </View>
                <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                    <Text
                        onPress={() => navigation.navigate("Login")}
                        style={[
                            styles.registerButton,
                            { color: "black", fontWeight: "bold", letterSpacing: 0, marginTop: -15 }
                        ]}
                    >
                        Already have an account
                    </Text>
                </View>
                <View>
                    {/* <Button variant={"ghost"}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{ color: "blue" }}>Back to Login</Text>
                    </Button> */}
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderStyle: "solid",
        borderWidth: 2,
        padding: 0,
        justifyContent: "center",
        borderRadius: 0,
        borderColor: "#664229",
        elevation: 10,
        marginTop: 20,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 0
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "#664229",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
});

export default Register;