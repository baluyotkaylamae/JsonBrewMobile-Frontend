import * as React from "react";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, VStack, Box, Text, Divider, Icon, NativeBaseProvider, Avatar } from "native-base";
import Main from "./Main";
import Login from "../Screens/User/Login";
import Cart from "../Screens/Cart/Cart";
import AdminNavigator from "./AdminNavigator";
import ProductList from "../Screens/Product/ProductList";
import AuthGlobal from "../Context/Store/AuthGlobal";

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "Home":
      return "home";
    case "Products":
      return "cart";
    case "Users":
      return "account";
    case "Product List":
      return "archive";
    case "Cart":
      return "cart-variant";
      case "Login":
        return "account-arrow-right";
    case "Admin":
      return "cog";
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  const context = React.useContext(AuthGlobal);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt");
      const response = await fetch(`${baseURL}users/${context.stateUser.user.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      } else {
        console.error("Failed to fetch user profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const isAdmin = () => {
    return userProfile && userProfile.isAdmin;
  };
  
  const handlePressIn = (name) => {
    setHoveredItem(name);
  };

  const handlePressOut = () => {
    setHoveredItem(null);
  };

  return (
    <DrawerContentScrollView {...props} safeArea>
      <Box flex={1} style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20, overflow: "hidden" }}>
        <VStack space={3} alignItems="flex-start" px={5} py={3}>
          {userProfile && (
            <Box flexDirection="row" alignItems="center">
              <Avatar source={{ uri: userProfile.avatar }} size="md" />
              <Pressable
                onPress={() => props.navigation.navigate("User")}
                onPressIn={() => handlePressIn("Users")}
                onPressOut={handlePressOut}
                style={({ pressed }) => ({
                  backgroundColor: pressed || hoveredItem === "Users" ? "#664229" : "transparent",
                  borderRadius: 8,
                  padding: 10,
                })}
              >
                <Text
                  px={2}
                  py={3}
                  fontWeight="500"
                  fontSize="lg"
                  color={"gray.700"}
                >
                  {userProfile.name}
                </Text>
              </Pressable>
            </Box>
          )}
          <Divider />
          {props.state.routeNames.map((name, index) => {
            // Check if the current item is "Admin" and if the user is an admin
            if (name === "Admin" && !isAdmin()) {
              return null; // Don't render the "Admin" item
            }
            return (
              <React.Fragment key={name}>
                <Box flexDirection="row" alignItems="center">
                  <Icon
                    mr={2}
                    color={index === props.state.index ? "primary.500" : "gray.500"}
                    size="sm"
                    as={<MaterialCommunityIcons name={getIcon(name)} />}
                  />
                  <Pressable
                    onPress={() => props.navigation.navigate(name)}
                    onPressIn={() => handlePressIn(name)}
                    onPressOut={handlePressOut}
                    style={({ pressed }) => ({
                      backgroundColor: pressed || hoveredItem === name ? "#664229" : "transparent",
                      borderRadius: 8,
                      padding: 10,
                    })}
                  >
                    <Text
                      px={2}
                      py={3}
                      fontWeight="500"
                      fontSize={name === "Products" || name === "Cart" || name === "Admin" ? "lg" : "md"} 
                      color={index === props.state.index ? "primary.500" : "gray.700"}
                    >
                      {name}
                    </Text>
                  </Pressable>
                </Box>
                {index < props.state.routeNames.length - 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </VStack>
      </Box>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="Products" component={Main} initialParams={{ screen: 'Products' }} />
      {/* <Drawer.Screen name="Product List" component={ProductList} /> */}
      <Drawer.Screen name="Cart" component={Cart} /> 
      <Drawer.Screen name="Login" component={Login} /> 
      <Drawer.Screen name="Admin" component={AdminNavigator} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <DrawerNavigator />
    </NativeBaseProvider>
  );
};

export default App;
