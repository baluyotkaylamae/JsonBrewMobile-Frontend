// import React, { useState, useEffect } from 'react';
// import { createStackNavigator } from "@react-navigation/stack";
// import Home from "../Screens/Home/home";
// import ProductContainer from '../Screens/Product/ProductContainer';
// import SingleProduct from '../Screens/Product/SingleProduct';

// const Stack = createStackNavigator();

// function MyStack({ hasProducts }) {
//     return (
//         <Stack.Navigator>
//             {hasProducts ? (
//                 <>
//                     <Stack.Screen
//                         name='Home'
//                         component={ProductContainer}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Stack.Screen
//                         name='Product Detail'
//                         component={SingleProduct}
//                     />
//                 </>
//             ) : (
//                 <Stack.Screen
//                     name='JsonBrew cafe'
//                     component={Home}
//                     options={{
//                         headerShown: false,
//                     }}
//                 />
//             )}
//         </Stack.Navigator>
//     );
// }

// export default function HomeNavigator() {
//     // Assuming you have some logic to determine if there are products available
//     const [hasProducts, setHasProducts] = useState(true);

//     useEffect(() => {
//         // Example logic to check if products are available
//         // Replace this with your actual logic to determine product availability
//         // For demonstration purposes, setHasProducts to false after 3 seconds
//         const timeout = setTimeout(() => {
//             setHasProducts(false);
//         }, 3000);

//         // Clean up the timeout to prevent memory leaks
//         return () => clearTimeout(timeout);
//     }, []);

//     return <MyStack hasProducts={hasProducts} />;
// }


import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductContainer from "../Screens/Product/ProductContainer";
import SingleProduct from '../Screens/Product/SingleProduct';

const Stack = createStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Product Detail'
                component={SingleProduct}
                // options={{
                //     headerShown: false,
                // }}
            />

        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}
