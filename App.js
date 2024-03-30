//271452028008-44pgshqf63a08nq4l8okqo5pk2oho2mp.apps.googleusercontent.com
//android:271452028008-e7h9gm30q42bemt4umn54jhmb222ksq5.apps.googleusercontent.com

import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, TextInput,  View, Button, Image } from 'react-native';
// import ProductContainer from './Screens/Product/ProductContainer';
import Header from './Shared/Header';
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons, SmallCloseIcon } from "@expo/vector-icons";
import { NativeBaseProvider, extendTheme, } from "native-base";
import { Center, VStack, Input, Heading, Icon, ScrollView, } from "native-base";
import Main from './Navigator/Main'
import { Provider } from "react-redux";
import store from "./Redux/store";
import Toast from "react-native-toast-message";
import Greeting from "./Shared/Greeting";
import Auth from './Context/Store/Auth';
import DrawerNavigator from './Navigator/DrawerNavigator';
import SearchedProduct from "./Screens/Product/SearchedProduct";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// WebBrowser.maybeCompleteAuthSession();

const theme = extendTheme({
  colors: {
    primary: {
      500: "white",
    },
    brand: {
      500: "forestgreen",
    },
  },
});

export default function App() {
  // const [token, setToken] = useState("");
  // const [userInfo, setUserInfo] = useState(null);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId: "271452028008-e7h9gm30q42bemt4umn54jhmb222ksq5.apps.googleusercontent.com",
  //   iosClientId: "",
  //   webClientId: "271452028008-44pgshqf63a08nq4l8okqo5pk2oho2mp.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   handleEffect();
  // }, [response, token]);

  // async function handleEffect() {
  //   const user = await getLocalUser();
  //   console.log("user", user);
  //   if (!user) {
  //     if (response?.type === "success") {
  //       // setToken(response.authentication.accessToken);
  //       getUserInfo(response.authentication.accessToken);
  //     }
  //   } else {
  //     setUserInfo(user);
  //     console.log("loaded locally");
  //   }
  // }

  // const getLocalUser = async () => {
  //   const data = await AsyncStorage.getItem("@user");
  //   if (!data) return null;
  //   return JSON.parse(data);
  // };

  // const getUserInfo = async (token) => {
  //   if (!token) return;
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const user = await response.json();
  //     await AsyncStorage.setItem("@user", JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch (error) {
  //   }
  // };
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>

            <DrawerNavigator />
            {/* <Main /> */}
            <Toast />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'left',
  },
});

