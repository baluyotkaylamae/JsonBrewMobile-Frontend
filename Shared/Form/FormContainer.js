import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = ({ children, title }) => {
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    title: {
        fontSize: 30,
    }
})

export default FormContainer;