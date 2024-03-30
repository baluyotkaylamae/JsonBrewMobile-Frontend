import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "#ccc", // Light gray color
    borderBottomWidth: 1,
    width: "110%",
    marginVertical: 10, // Adjusted margin top and bottom
    marginTop: "1%",
    marginLeft: "-26%",
    marginBottom: "-1%",
  },
});

export default Divider;
