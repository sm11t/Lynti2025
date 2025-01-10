import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {FontAwesome} from "@expo/vector-icons"; // Icon library for icons

export default function SearchScreen() {
    const router = useRouter(); // Router for navigation

    return (
        <View className="flex-1 bg-razer-darkGray">
            {/* Top Navigation: Red X Button */}
            <View className="absolute top-16 left-4">
                <TouchableOpacity
                    onPress={() => router.back()} // Navigate back
                    className="p-2 rounded-full"
                >
                    <FontAwesome name="times" size={25} color="red"/>
                </TouchableOpacity>
            </View>

            {/* Main Box */}
            <View className="flex-1 justify-start items-center mt-32">
                <View className="w-11/12 bg-razer-darkGray border border-razer-green rounded-lg p-4">
                    {/* Start Section */}
                    <View className="flex-row items-center mb-4">
                        <FontAwesome
                            name="circle"
                            size={12}
                            color="#00FF00" // Green for the Start icon
                            className="mr-4"
                        />
                        <View>
                            <Text className="text-razer-green text-sm font-medium">
                                Start
                            </Text>
                            <Text className="text-white text-lg font-semibold">
                                Current Location
                            </Text>
                        </View>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-600 mb-4"/>

                    {/* Destination Section */}
                    <View className="flex-row items-center">
                        <FontAwesome
                            name="circle"
                            size={12}
                            color="#00FF00" // Green for the Destination icon
                            className="mr-4"
                        />
                        <View>
                            <Text className="text-razer-green text-sm font-medium">
                                Destination
                            </Text>
                            <Text className="text-gray-400 text-lg">
                                {/* Placeholder for input */}
                                ___________________
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
