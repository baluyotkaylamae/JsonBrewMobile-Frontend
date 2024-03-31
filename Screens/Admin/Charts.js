import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import ModalDropdown from "react-native-modal-dropdown";

const Chart = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChartType, setSelectedChartType] = useState({
    totalSales: "Line",
    productCounts: "Bar",
    orderCount: "Line",
  });

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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <Text style={styles.title}>Total Sales by Date</Text>
          <ModalDropdown
            options={["Line", "Bar", "Pie"]}
            onSelect={(index, value) =>
              setSelectedChartType((prevState) => ({
                ...prevState,
                totalSales: value,
              }))
            }
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownStyle}
          />
          {selectedChartType.totalSales === "Line" && (
            <LineChart
              data={{
                labels: labels,
                datasets: [{ data: data }],
              }}
              width={350}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 10,
                borderRadius: 10,
              }}
            />
          )}
          {selectedChartType.totalSales === "Bar" && (
            <BarChart
              data={{
                labels: labels,
                datasets: [{ data: data }],
              }}
              width={350}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={chartConfig}
              style={{
                marginVertical: 10,
                borderRadius: 10,
              }}
            />
          )}
          {selectedChartType.totalSales === "Pie" && (
            <>
              <PieChart
                data={labels.map((label, index) => ({
                  name: label,
                  population: data[index],
                  color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                    Math.random() * 256
                  )}, ${Math.floor(Math.random() * 256)}, 1)`,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                }))}
                width={Dimensions.get("window").width - 16}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              <ModalDropdown
                options={["Line", "Bar", "Pie"]}
                onSelect={(index, value) =>
                  setSelectedChartType((prevState) => ({
                    ...prevState,
                    totalSales: value,
                  }))
                }
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
              />
            </>
          )}
        </View>
        {selectedChartType.totalSales === "Pie" && (
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Pie Chart Options</Text>
            <ModalDropdown
              options={["Line", "Bar", "Pie"]}
              onSelect={(index, value) =>
                setSelectedChartType((prevState) => ({
                  ...prevState,
                  totalSales: value,
                }))
              }
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
        )}
        <View style={styles.chartContainer}>
          <Text style={styles.title}>Product Counts in Stocks</Text>
          <ModalDropdown
            options={["Line", "Bar", "Pie"]}
            onSelect={(index, value) =>
              setSelectedChartType((prevState) => ({
                ...prevState,
                productCounts: value,
              }))
            }
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownStyle}
          />
          {selectedChartType.productCounts === "Line" && (
            <LineChart
              data={{
                labels: productLabels,
                datasets: [{ data: productData }],
              }}
              width={350}
              height={220}
              yAxisLabel="#"
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
          {selectedChartType.productCounts === "Bar" && (
            <BarChart
              data={{
                labels: productLabels,
                datasets: [{ data: productData }],
              }}
              width={350}
              height={220}
              yAxisLabel="#"
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
          {selectedChartType.productCounts === "Pie" && (
            <>
              <PieChart
                data={productLabels.map((label, index) => ({
                  name: label,
                  population: productData[index],
                  color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                    Math.random() * 256
                  )}, ${Math.floor(Math.random() * 256)}, 1)`,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                }))}
                width={Dimensions.get("window").width - 16}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              <ModalDropdown
                options={["Line", "Bar", "Pie"]}
                onSelect={(index, value) =>
                  setSelectedChartType((prevState) => ({
                    ...prevState,
                    productCounts: value,
                  }))
                }
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
              />
            </>
          )}
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.title}>Number of Orders Each Day</Text>
          <ModalDropdown
            options={["Line", "Bar", "Pie"]}
            onSelect={(index, value) =>
              setSelectedChartType((prevState) => ({
                ...prevState,
                orderCount: value,
              }))
            }
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownStyle}
          />
          {selectedChartType.orderCount === "Line" && (
            <LineChart
              data={{
                labels: labels,
                datasets: [{ data: orderCountChartData }],
              }}
              width={350}
              height={220}
              yAxisLabel="#"
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
          {selectedChartType.orderCount === "Bar" && (
            <BarChart
              data={{
                labels: labels,
                datasets: [{ data: orderCountChartData }],
              }}
              width={350}
              height={220}
              yAxisLabel="#"
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
          {selectedChartType.orderCount === "Pie" && (
            <>
              <PieChart
                data={labels.map((label, index) => ({
                  name: label,
                  population: orderCountChartData[index],
                  color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                    Math.random() * 256
                  )}, ${Math.floor(Math.random() * 256)}, 1)`,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                }))}
                width={Dimensions.get("window").width - 16}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              <ModalDropdown
                options={["Line", "Bar", "Pie"]}
                onSelect={(index, value) =>
                  setSelectedChartType((prevState) => ({
                    ...prevState,
                    orderCount: value,
                  }))
                }
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
              />
            </>
          )}
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
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  dropdownText: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
  },
  dropdownStyle: {
    width: 150,
    height: 120,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default Chart;
