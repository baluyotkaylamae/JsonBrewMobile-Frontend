import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker, Select } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import baseURL from "../assets/common/baseurl";
import { useNavigation } from '@react-navigation/native'

const codes = [
  { name: "Pending", code: "3", color: "#FFA500" },
  { name: "Shipped", code: "2", color: "#008000" },
  { name: "Delivered", code: "1", color: "#0000FF" },
];

const OrderCard = ({ item, select }) => {
  const [orderStatus, setOrderStatus] = useState('');
  const [statusText, setStatusText] = useState('');
  const [statusChange, setStatusChange] = useState('');
  const [token, setToken] = useState('');
  const [cardColor, setCardColor] = useState('#FFFFFF');
  const navigation = useNavigation()

  const updateOrder = () => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const order = {
      city: item.city,
      country: item.country,
      dateOrdered: item.dateOrdered,
      id: item.id,
      orderItems: item.orderItems,
      phone: item.phone,
      shippingAddress1: item.shippingAddress1,
      shippingAddress2: item.shippingAddress2,
      status: statusChange,
      totalPrice: item.totalPrice,
      user: item.user,
      zip: item.zip,
    };
    axios
      .put(`${baseURL}orders/${item.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Edited",
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
  }

  useEffect(() => {
    let statusComponent;
    let statusTextValue;
    let colorValue;
  
    switch (item.status) {
      case "3":
        statusComponent = <TrafficLight unavailable></TrafficLight>;
        statusTextValue = "Pending";
        colorValue = "#FFA500"; // Orange color for Pending
        break;
      case "2":
        statusComponent = <TrafficLight limited></TrafficLight>;
        statusTextValue = "Shipped";
        colorValue = "#008000"; // Green color for Shipped
        break;
      case "1":
        statusComponent = <TrafficLight available></TrafficLight>;
        statusTextValue = "Delivered";
        colorValue = "#0000FF"; // Blue color for Delivered
        break;
      default:
        statusComponent = null;
        statusTextValue = "";
        colorValue = "#FFFFFF"; // Default color
        break;
    }
  
    setOrderStatus(statusComponent);
    setStatusText(statusTextValue);
    setCardColor(colorValue);
  
    return () => {
      setOrderStatus(null);
      setStatusText("");
      setCardColor("#FFFFFF");
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }]}>
      <View style={styles.statusCard}>
        <View style={[styles.statusTextContainer, { backgroundColor: cardColor }]}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text>Order Number: #{item.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText}
        </Text>
        <Text>
          Address: {item.shippingAddress1} {item.shippingAddress2}
        </Text>
        <Text>City: {item.city}</Text>
        <Text>Country: {item.country}</Text>
        <Text>Date Ordered: {item.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {item.totalPrice}</Text>
        </View>
        {!select &&
          <View>
            <Select
              width="80%"
              iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              color="white"
              placeholder="Change Status"
              placeholderTextColor="black"
              placeholderStyle={{ color: '#FFFFFF' }}
              placeholderIconColor="#007aff"
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return <Select.Item
                  key={c.code}
                  label={c.name}
                  value={c.code}
                />
              })}
            </Select>
            <EasyButton
              secondary
              large
              onPress={() => updateOrder()}
            >
              <Text style={{ color: "black" }}>Update</Text>
            </EasyButton>
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  statusCard: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 5,
    // elevation: 1,
    zIndex: 1,
  },
  statusTextContainer: {
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#FFFFFF', // Color of the status text
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "black",
    fontWeight: "bold",
  },
});

export default OrderCard;
