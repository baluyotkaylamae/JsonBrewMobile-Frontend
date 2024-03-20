import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Badge, Text, VStack, Divider, HStack } from 'native-base';

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
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
                            <Text style={styles.text}>All</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    text: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold'
    },
    active: {
        backgroundColor: '#664229',
    },
    inactive: {
        backgroundColor: '#D2B48C', 
    }
});

export default CategoryFilter;
