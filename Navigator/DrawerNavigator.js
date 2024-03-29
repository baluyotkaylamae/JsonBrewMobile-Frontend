import * as React from "react";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, VStack, Box, Text, Divider, Icon } from "native-base";
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
    case "Categories":
      return "format-list-bulleted";
    case "Cart":
      return "cart-outline";
    case "Admin":
      return "cog";
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  const context = React.useContext(AuthGlobal);
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const handlePressIn = (name) => {
    setHoveredItem(name);
  };

  const handlePressOut = () => {
    setHoveredItem(null);
  };

  return (
    <DrawerContentScrollView {...props} safeArea style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
      <Box flex={1}>
        <VStack space={3} alignItems="flex-start" px={5} py={3}>
          <Box flexDirection="row" alignItems="center">
            <Icon
              mr={2}
              color={"gray.500"}
              size="sm"
              as={<MaterialCommunityIcons name={getIcon("Users")} />}
            />
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
                Users
              </Text>
            </Pressable>
          </Box>
          <Divider />
          {props.state.routeNames.map((name, index) => (
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
          ))}
        </VStack>
      </Box>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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

export default DrawerNavigator;
