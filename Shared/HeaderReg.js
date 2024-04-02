import React from "react"
import { StyleSheet, Image, SafeAreaView, View } from "react-native"

const HeaderReg = () => {
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
        marginTop: -20,
        marginBottom: -10,
    }
})

export default HeaderReg