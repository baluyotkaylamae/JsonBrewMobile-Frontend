import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper";

var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            "https://i.imgur.com/fHi6VOq.png",
            "https://antdisplay.com/pub/media/magefan_blog/360_F_475261715_tiZbDtrK7zf2AisP7M5sgzdWU50QQIZq.jpg",
            "https://previews.123rf.com/images/mitdesign/mitdesign1806/mitdesign180600006/102958625-cold-brewed-coffee-ads-on-hot-summer-beach-scene-in-3d-illustration.jpg",
        ]);

        return () => {
            setBannerData([]);
        };
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode="cover"
                                    source={{ uri: item }}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 50 }}></View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    swiper: {
        width: width,
        alignItems: "center",
        marginTop: 10,
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 25,
        marginHorizontal: 20,
    },
});

export default Banner;