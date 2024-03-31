import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Greeting = () => {
  return (
    <View style={styles.greetingContainer}>
      <Text>
        <Text style={styles.enjoyText}>Enjoy Our</Text>
        {'\n'}
        <Text style={styles.drinksText}>Delicious Drinks</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    alignItems: 'left',
    paddingVertical: 0,
    marginTop: -5,
    marginLeft: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  enjoyText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'normal',
  },
  drinksText: {
    color: '#B99960',
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default Greeting;
