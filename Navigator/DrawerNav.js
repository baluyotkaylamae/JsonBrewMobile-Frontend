// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             drawerLabel: "Home",
//             drawerIcon: ({ color }) => (
//               <MaterialCommunityIcons
//                 name="home"
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Menu"
//           component={MenuScreen}
//           options={{
//             drawerLabel: "Menu",
//             drawerIcon: ({ color }) => (
//               <MaterialCommunityIcons
//                 name="food"
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Cart"
//           component={CartScreen}
//           options={{
//             drawerLabel: "Cart",
//             drawerIcon: ({ color }) => (
//               <MaterialCommunityIcons
//                 name="cart"
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             drawerLabel: "Profile",
//             drawerIcon: ({ color }) => (
//               <MaterialCommunityIcons
//                 name="account"
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default DrawerNavigator;
