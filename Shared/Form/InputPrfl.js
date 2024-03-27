import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#718096"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF', // White with 90% opacity
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#2D3748',
        borderWidth: 1,
        borderColor: '#CBD5E0',
        elevation: 2, // Adds a shadow
    },
});

export default Input;
