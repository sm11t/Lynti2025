import React, {useState} from "react";
import {View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import {useRouter} from "expo-router";
import {FontAwesome} from "@expo/vector-icons"; // Icon library for icons

export default function SearchScreen() {
    const router = useRouter();
    const [activeField, setActiveField] = useState("Destination");

    // Dummy list of recent destinations
    const recentDestinations = [
        {id: "1", name: "West 6th", address: "6th St"},
        {id: "2", name: "The Carmin", address: "1000 E Apache Blvd"},
        {id: "3", name: "Scottsdale Fashion Square", address: "E Highland Ave"},
    ];

    return (
        <View className="flex-1 bg-razer-darkGray">
            {/* Top Navigation: Red X Button and Label */}
            <View className="absolute top-16 left-4 right-4 items-center">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-0 p-2 rounded-full"
                >
                    <FontAwesome name="times" size={25} color="red"/>
                </TouchableOpacity>

                <Text className="text-white text-xl font-semibold" style={{marginTop: 7}}>
                    {activeField}
                </Text>
            </View>

            {/* Main Box: Start and Destination Sections */}
            <View className="flex-1 justify-start items-center mt-32">
                <View className="w-11/12 bg-razer-darkGray border border-razer-green rounded-lg p-4">
                    {/* Start Section */}
                    <View className="flex-row items-center mb-4">
                        <FontAwesome name="circle-o" size={12} color="#00FF00" className="mr-4"/>
                        <View>
                            <Text className="text-razer-green text-sm font-medium">Start</Text>
                            <Text className="text-white text-lg mt-1">Current Location</Text>
                        </View>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-600 mb-4"/>

                    {/* Destination Section */}
                    <View className="flex-row items-center">
                        <FontAwesome name="circle" size={12} color="#00FF00" className="mr-4"/>
                        <View style={{flex: 1}}>
                            <Text className="text-razer-green text-sm font-medium">Destination</Text>
                            <TextInput
                                placeholder="Enter Destination"
                                placeholderTextColor="#A6A6A6"
                                style={{
                                    height: 35,
                                    paddingVertical: 2,
                                    color: "white",
                                    borderBottomWidth: 0,
                                }}
                                autoFocus
                                onFocus={() => setActiveField("Destination")}
                            />
                        </View>
                    </View>
                </View>

                {/* Recent Destinations List */}
                <FlatList
                    data={recentDestinations}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 12,
                                paddingLeft: 20, // Match the search box padding
                                borderBottomWidth: 1,
                                borderBottomColor: "#333",
                                width: "90%",
                            }}
                        >
                            {/* Rewind Icon */}
                            <FontAwesome name="history" size={20} color="#00FF00" style={{marginRight: 15}}/>

                            {/* Destination Info */}
                            <View>
                                <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>
                                    {item.name}
                                </Text>
                                <Text style={{color: "#A6A6A6", fontSize: 14}}>
                                    {item.address}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    style={{
                        marginTop: 15,
                        width: "100%",
                    }}
                />
            </View>
        </View>
    );
}
