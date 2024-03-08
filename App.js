import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import ProductContainer from './Screens/Product/ProductContainer';
import Header from './Shared/Header';
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, extendTheme, } from "native-base";
import Main from './Navigator/Main'
import { Provider } from "react-redux";
import store from "./Redux/store";
import Toast from "react-native-toast-message";
import Auth from './Context/Store/Auth';
// import DrawerNavigation from './Navigator/DrawerNavigator';

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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
