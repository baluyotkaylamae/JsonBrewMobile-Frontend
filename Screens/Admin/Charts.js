import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";

const Chart = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
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

    axios
      .get(`${baseURL}products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("Error loading products", error);
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
  const orderCountData = {};
  orders.forEach((order) => {
    const date = new Date(order.dateOrdered).toLocaleDateString();
    if (!salesData[date]) {
      salesData[date] = 0;
      orderCountData[date] = 0;
    }
    salesData[date] += order.totalPrice;
    orderCountData[date]++;
  });

  // Extract labels and data for the line chart
  const labels = Object.keys(salesData);
  const data = labels.map((label) => salesData[label]);

  // Extract product counts in stocks for the bar chart
  const productCounts = {};
  products.forEach((product) => {
    productCounts[product.name] = product.countInStock;
  });

  const productLabels = Object.keys(productCounts);
  const productData = productLabels.map((label) => productCounts[label]);

  // Prepare data for the line chart - Number of orders each day
  const orderCountChartData = labels.map((label) => orderCountData[label] || 0);

  // Configure chart appearance
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text>Total Sales by Date</Text>
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: data }],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={styles.chartContainer}>
          <Text>Product Counts in Stocks</Text>
          <BarChart
            data={{
              labels: productLabels,
              datasets: [{ data: productData }],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel="#"
            chartConfig={chartConfig}
          />
        </View>
        <View style={styles.chartContainer}>
          <Text>Number of Orders Each Day</Text>
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: orderCountChartData }],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel="#"
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  chartContainer: {
    marginBottom: 20,
  },
});

export default Chart;
