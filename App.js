import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
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
import DrawerNavigation from './Navigator/DrawerNavigator';
import DrawerNavigator from './Navigator/DrawerNav';
import SearchedProduct from "./Screens/Product/SearchedProduct";

const theme = extendTheme({
  colors: {
    primary: {
      500: "teal", // Background color
    },
    // Add more color overrides as needed
    brand: {
      500: "forestgreen", // Text color
    },
  },
});



export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            {/* <Header /> */}
            {/* <Greeting /> */}
            {/* <DrawerNavigation /> */}
            <Main />
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

