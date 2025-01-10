import React, {useState} from "react";
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {useRouter} from "expo-router";
import {FontAwesome} from "@expo/vector-icons"; // Icon library for icons

export default function SearchScreen() {
    const router = useRouter(); // Router for navigation
    const [activeField, setActiveField] = useState("Destination"); // Default state set to "Destination"
    const [destination, setDestination] = useState(""); // State for the Destination input
    const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode

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
                    <TouchableOpacity
                        onPress={() => setActiveField("Start")} // Set state to "Start" when pressed
                        className="flex-row items-center mb-4"
                    >
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
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="h-px bg-gray-600 mb-4"/>

                    {/* Destination Section */}
                    <TouchableOpacity
                        onPress={() => {
                            setActiveField("Destination"); // Set state to "Destination"
                            setIsEditing(true); // Enable edit mode
                        }}
                        className="flex-row items-center"
                    >
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
                            {isEditing ? (
                                <TextInput
                                    value={destination} // Current value for the input
                                    onChangeText={setDestination} // Update state as the user types
                                    placeholder="Set Destination"
                                    placeholderTextColor="#A6A6A6" // Placeholder color
                                    autoFocus // Auto focus when editing starts
                                    onBlur={() => setIsEditing(false)} // Exit edit mode when input loses focus
                                    className="text-gray-400 text-lg"
                                />
                            ) : (
                                <Text
                                    className="text-gray-400 text-lg"
                                    style={{marginBottom: 0}} // Adjust spacing
                                >
                                    {destination || "Set Destination"} {/* Display input value or placeholder */}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
