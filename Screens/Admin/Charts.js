import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import TotalSales from "./TotalSales";

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

  // Calculate total sales by date
  const salesData = {};
  orders.forEach((order) => {
    const date = new Date(order.dateOrdered).toLocaleDateString();
    if (!salesData[date]) {
      salesData[date] = 0;
    }
    salesData[date] += order.totalPrice;
  });

  const labels = Object.keys(salesData);
  const data = labels.map((label) => salesData[label]);

  // Calculate product counts in stock
  const productCounts = {};
  products.forEach((product) => {
    productCounts[product.name] = product.countInStock;
  });

  const productLabels = Object.keys(productCounts);
  const productData = productLabels.map((label) => productCounts[label]);

  // // Calculate most bought products
  // const mostBoughtProducts = {};
  // orders.forEach((order) => {
  //   order.orderItems.forEach((item) => {
  //     const product = products.find((p) => p._id === item.product);
  //     if (product) {
  //       if (!mostBoughtProducts[product.name]) {
  //         mostBoughtProducts[product.name] = 0;
  //       }
  //       mostBoughtProducts[product.name] += item.quantity;
  //     }
  //   });
  // });

  // const pieChartData = Object.keys(mostBoughtProducts).map((productName) => ({
  //   name: productName,
  //   count: mostBoughtProducts[productName],
  // }));

  // const pieChartLabels = pieChartData.map((data) => data.name);

  return (
    <View>
      <Text>Total Sales by Date</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
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
  chartContainer: {
    marginBottom: 20,
  },
});

export default Chart;
