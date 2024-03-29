import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import TotalSales from "./TotalSales";

const Chart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error loading orders", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Aggregate total sales for each date
  const salesData = {};
  orders.forEach((order) => {
    const date = new Date(order.dateOrdered).toLocaleDateString();
    if (!salesData[date]) {
      salesData[date] = 0;
    }
    salesData[date] += order.totalPrice;
  });

  // Extract labels and data for the chart
  const labels = Object.keys(salesData);
  const data = labels.map((label) => salesData[label]);

  return (
    <View>
      <View style={styles.container}>
        <TotalSales salesData={salesData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chart;
