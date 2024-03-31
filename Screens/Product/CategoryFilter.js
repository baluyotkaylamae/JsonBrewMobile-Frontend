import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Badge, Text, VStack, Divider, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import kovfefe from '../../assets/kovfefe.png';

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: "white" }}
        >
            <VStack space={4} divider={<Divider />} w="100%">
                <HStack justifyContent="space-between">
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            props.categoryFilter('all'), props.setActive(-1)
                        }}
                    >
                        <Badge style={[styles.center, styles.badge, props.active === -1 ? styles.active : styles.inactive]} colorScheme="info" >
                            <Image source={kovfefe} style={styles.Categoryicon} />
                            <Text style={styles.alltext}>All</Text>
                        </Badge>
                    </TouchableOpacity>
                    {props.categories.map((item) => (
                        <TouchableOpacity
                            key={item._id}
                            onPress={() => {
                                props.categoryFilter(item._id),
                                    props.setActive(props.categories.indexOf(item))
                            }}
                        >
                            <Badge
                                style={[styles.center, styles.badge, props.active === props.categories.indexOf(item) ? styles.active : styles.inactive]}
                            >
                                <Image source={kovfefe} style={styles.Categoryicon} />
                                <Text style={styles.text}>{item.name}</Text>
                            </Badge>
                        </TouchableOpacity>
                    ))}
                </HStack>
            </VStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    badge: {
        margin: 5,
        height: 100, // Increased padding horizontally
        width: 80,
        paddingVertical: 15, // Increased padding vertically
        borderRadius: 40,
        marginBottom: 30,
    },
    alltext: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 16 // Add margin left for text
    },
    text: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 5 // Add margin left for text
    },
    active: {
        backgroundColor: '#664229',
    },
    inactive: {
        backgroundColor: '#D2B48C',
    },
    Categoryicon: {
        alignContent: 'center',
        width: 50,
        height: 50,
    },
});

export default CategoryFilter;
