import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";

const Chart = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.log("Error loading categories", error);
        setLoading(false); // Set loading to false on error too
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const categoryNames = categories.map((category) => category.name);
  const categoryCounts = categories.map((category) => category.count);

  return (
    <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
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
});

export default Chart;
