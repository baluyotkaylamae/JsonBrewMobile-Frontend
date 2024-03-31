import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from "react-native";
import EasyButton from "./StyledComponents/EasyButton";
import TrafficLight from "./StyledComponents/TrafficLight";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import baseURL from "../assets/common/baseurl";
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  useEffect(() => {
    let statusComponent;
    let statusTextValue;
    let colorValue;

    switch (item.status) {
      case "3":
        statusComponent = <TrafficLight unavailable />;
        statusTextValue = "Pending";
        colorValue = "#E74C3C";
        break;
      case "2":
        statusComponent = <TrafficLight limited />;
        statusTextValue = "Shipped";
        colorValue = "#F1C40F";
        break;
      case "1":
        statusComponent = <TrafficLight available />;
        statusTextValue = "Delivered";
        colorValue = "#2ECC71";
        break;
      default:
        statusComponent = null;
        statusTextValue = "";
        colorValue = "#FFFFFF";
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

  const handleWriteReview = () => {
    navigation.navigate('My Reviews', { orderId: item.id });
  };
  
  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF', shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }]}>
        <View style={styles.statusCard}>
          <View style={[styles.statusTextContainer, { backgroundColor: cardColor }]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text><Text style={{ fontWeight: 'bold' }}>Order Number:</Text> #{item.id}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Status:</Text> {statusText}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Address:</Text> {item.shippingAddress1} {item.shippingAddress2}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>City:</Text> {item.city}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Country:</Text> {item.country}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Date Ordered:</Text> {item.dateOrdered.split("T")[0]}</Text>
          <View style={styles.priceContainer}>
            <Text>Price: </Text>
            <Text style={styles.price}>₱ {item.totalPrice}</Text>
          </View>
        </View>

        {item.status === "1" && (
          <Button title="Go To Review" onPress={handleWriteReview} />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  statusCard: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  statusTextContainer: {
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#FFFFFF', 
  },
  priceContainer: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "red",
    fontWeight: "bold",
  }
});

export default OrderCard;
