import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"
import EasyButton from "../../Shared/StyledComponents/EasyButton";


var { width } = Dimensions.get("window");

const ListItem = ({ item, index, deleteProduct }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()
    
    const handleEdit = () => {
        navigation.navigate("ProductForm", { item });
        setModalVisible(false);
    }

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={styles.closeButton}
                        >
                            <Icon name="close" size={20} />
                        </TouchableOpacity>
                        <EasyButton
                            medium
                            secondary
                            onPress={handleEdit}
                            title="Edit"
                        >
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton
                            medium
                            danger
                            onPress={() => {
                                deleteProduct(item._id);
                                setModalVisible(false);
                            }}
                            title="Delete"
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>

                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => navigation.navigate("Product Detail", { item })}
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, {
                    backgroundColor: index % 2 === 0 ? "white" : "gainsboro"
                }]}
            >
                <Image
                    source={{
                        uri: item.image ? item.image : null
                    }}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.item}>{item.brand}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{item.name ? item.name : null}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{item.category ? item.category.name : null}</Text>
                <Text style={styles.item}>₱ {item.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    },
    closeButton: {
        alignSelf: "flex-end",
        position: "absolute",
        top: 5,
        right: 10
    }
})

export default ListItem;
