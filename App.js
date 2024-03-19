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
import Auth from './Context/Store/Auth';
// import DrawerNavigation from './Navigator/DrawerNavigator';
import SearchedProduct from "./Screens/Product/SearchedProduct";

const theme = extendTheme({ colors: newColorTheme });
const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};


export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <Header />
            <Greeting />
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
  greetingContainer: {
    alignItems: 'left',
    paddingVertical: 0,
    marginTop: -10,
    marginLeft: 20,
    backgroundColor: '#fff',
  },
  enjoyText: {
    color: '#000000',
    fontSize: 30,
    // fontFamily: 'Arial',
    fontWeight: 'normal',
  },
  drinksText: {
    color: '#B99960',
    fontSize: 35,
    // fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});

const Greeting = () => {
  return (
    <View style={styles.greetingContainer}>
      <Text>
        <Text style={styles.enjoyText}>Enjoy Our</Text>
        {'\n'}
        <Text style={styles.drinksText}>Delicious Drinks</Text>
      </Text>
    </View>
  );
};


