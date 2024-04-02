import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";

const TotalSales = () => {
  const [totalSalesData, setTotalSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleChartPress = () => {
    setModalVisible(true);
  };

  // Modal content
  const modalContent = (
    <View style={styles.modalContent}>
      <ScrollView>
        {totalSalesData.map((item, index) => (
          <View key={index} style={styles.modalItem}>
            <Text>{item.date}: ${item.totalSales}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChartPress}>
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
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {modalContent}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    minHeight: 220, 
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
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    backgroundColor: "#FF66C4",
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TotalSales;
