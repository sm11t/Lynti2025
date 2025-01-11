import React, {useState} from "react";
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {useRouter} from "expo-router";
import {FontAwesome} from "@expo/vector-icons"; // Icon library for icons

export default function SearchScreen() {
    const router = useRouter(); // Router for navigation
    const [activeField, setActiveField] = useState("Destination"); // Default state set to "Destination"

    return (
        <View className="flex-1 bg-razer-darkGray">
            {/* Top Navigation: Red X Button and Label */}
            <View className="absolute top-16 left-4 right-4 items-center">
                {/* Red X Button */}
                <TouchableOpacity
                    onPress={() => router.back()} // Navigate back
                    className="absolute left-0 p-2 rounded-full"
                >
                    <FontAwesome name="times" size={25} color="red"/>
                </TouchableOpacity>

                {/* Centered Label */}
                <Text
                    className="text-white text-xl font-semibold"
                    style={{marginTop: 7}} // Adjust vertical alignment of the label
                >
                    {activeField}
                </Text>
            </View>

            {/* Main Box: Start and Destination Sections */}
            <View className="flex-1 justify-start items-center mt-32">
                <View className="w-11/12 bg-razer-darkGray border border-razer-green rounded-lg p-4">
                    {/* Start Section */}
                    <View className="flex-row items-center mb-4">
                        <FontAwesome
                            name="circle-o"
                            size={12}
                            color="#00FF00" // Green for Start icon
                            className="mr-4"
                        />
                        <View>
                            <Text className="text-razer-green text-sm font-medium">Start</Text>
                            <TextInput
                                placeholder="Current Location" // Placeholder as "Current Location"
                                placeholderTextColor="#FFFFFF" // Placeholder appears white
                                className="text-white text-lg mt-1"
                                style={{
                                    height: 35, // Ensure enough height
                                    paddingVertical: 2, // Prevent text clipping
                                    borderBottomWidth: 0, // Remove unnecessary bottom border
                                }}
                                onFocus={() => setActiveField("Start")} // Set active field to "Start" when focused
                            />
                        </View>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-600 mb-4"/>

                    {/* Destination Section */}
                    <View className="flex-row items-center">
                        <FontAwesome
                            name="circle"
                            size={12}
                            color="#00FF00" // Green for Destination icon
                            className="mr-4"
                        />
                        <View>
                            <Text className="text-razer-green text-sm font-medium">Destination</Text>
                            <TextInput
                                placeholder="Enter Destination"
                                placeholderTextColor="#A6A6A6"
                                className="text-white text-lg mt-1"
                                style={{
                                    height: 35, // Ensure enough height
                                    paddingVertical: 2, // Prevent text clipping
                                    borderBottomWidth: 0, // Remove unnecessary bottom border
                                }}
                                autoFocus // Automatically opens keyboard on page load
                                onFocus={() => setActiveField("Destination")} // Set active field to "Destination" when focused
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
