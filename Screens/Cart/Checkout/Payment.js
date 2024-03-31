import React, { useState } from 'react'
import { View, Button } from 'react-native'
import {
    Container,
    Text,
    Radio,
    Box,
    VStack,
    Heading,
    Select,
    CheckIcon,
    Center,
    HStack,
} from 'native-base';

import { useNavigation } from '@react-navigation/native';

const Payment = ({ route }) => {
    const order = route.params;
    const navigation = useNavigation();

    return (
        <Center flex={1}>
            <VStack width="90%">
                <Box
                    bg="white"
                    borderRadius="xl"
                    shadow={4}
                    p={6}
                    mb={4}
                    width="100%"
                >
                    <Heading mb={4}>Payment Method</Heading>
                    <Radio.Group defaultValue={1}>
                        <Radio value={1} my={1}>
                            Cash on Delivery
                        </Radio>
                    </Radio.Group>
                </Box>

                <Button
                    title={"Confirm"}
                    color="#664229"
                    onPress={() => navigation.navigate("Confirm", { order: order })}
                />
            </VStack>
        </Center>
    );
}

export default Payment;
