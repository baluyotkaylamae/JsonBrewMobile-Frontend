import React from "react"
import { StyleSheet, Image, SafeAreaView, View } from "react-native"

const Header = () => {
    return (
        //<View style={styles.header}>
        <SafeAreaView style={styles.header}>
            <Image
                source={require("../assets/logolanding.png")}
                resizeMode="contain"
                style={{ height: 70 }}
            />
        </SafeAreaView>
        //</View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: -30,
        marginBottom: -20,
    }
})

export default Header