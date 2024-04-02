import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";

const TotalSales = () => {
  const [totalSalesData, setTotalSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}orders`)
      .then((res) => {
        const salesData = aggregateTotalSales(res.data);
        setTotalSalesData(salesData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error loading orders", error);
        setLoading(false);
      });
  }, []);

  const aggregateTotalSales = (orders) => {
    const salesData = {};
    orders.forEach((order) => {
      const date = new Date(order.dateOrdered).toLocaleDateString();
      if (!salesData[date]) {
        salesData[date] = 0;
      }
      salesData[date] += order.totalPrice;
    });
    return Object.entries(salesData).map(([date, totalSales]) => ({
      date,
      totalSales,
    }));
  };

  const labels = totalSalesData.map((data) => data.date);
  const data = totalSalesData.map((data) => data.totalSales);

  // Configure chart appearance
  const chartConfig = {
    backgroundColor: "#FF66C4",
    backgroundGradientFrom: "#664229",
    backgroundGradientTo: "#CBA387",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.title}>Total Sales by Date</Text>
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: data }],
            }}
            width={Dimensions.get("window").width - 16}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 10,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
});

export default TotalSales;
