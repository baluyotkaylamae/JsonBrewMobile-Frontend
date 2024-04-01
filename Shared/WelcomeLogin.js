import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Greeting = () => {
  return (
    <View style={styles.greetingContainer}>
      <Text>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        {'\n'}
        <Text style={styles.drinksText}>You've been missed!</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    paddingVertical: 0,
    marginTop: 3,
    // marginLeft: 20,
    marginBottom: 25,
    backgroundColor: '#fff',
  },
  welcomeText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'normal',
  },
  drinksText: {
    color: '#B99960',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Greeting;
