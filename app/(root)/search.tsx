import React, {useState, useRef, useEffect} from "react";
import {View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import {useRouter} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";

export default function SearchScreen() {
    const router = useRouter();
    const [activeField, setActiveField] = useState("Destination");
    const [startLocation, setStartLocation] = useState("Current Location");
    const [destination, setDestination] = useState("");
    const startInputRef = useRef(null);
    const destinationInputRef = useRef(null);

    // Automatically focus on Destination input when the screen loads
    useEffect(() => {
        setTimeout(() => {
            destinationInputRef.current?.focus();
        }, 500); // Small delay to ensure UI is ready before focusing
    }, []);

    // Dummy list of recent destinations
    const recentDestinations = [
        {id: "1", name: "West 6th", address: "6th St"},
        {id: "2", name: "The Carmin", address: "1000 E Apache Blvd"},
        {id: "3", name: "Scottsdale Fashion Square", address: "E Highland Ave"},
    ];

    // Dummy list of favorite start locations
    const favoriteStarts = [
        {id: "1", name: "ASU Memorial Union", address: "Tempe, AZ"},
        {id: "2", name: "Phoenix Sky Harbor", address: "Phoenix, AZ"},
        {id: "3", name: "Downtown Chandler", address: "Chandler, AZ"},
    ];

    return (
        <View className="flex-1 bg-razer-darkGray">
            {/* Top Navigation: Red X Button and Label */}
            <View className="absolute top-16 left-4 right-4 items-center">
                <TouchableOpacity onPress={() => router.back()} className="absolute left-0 p-2 rounded-full">
                    <FontAwesome name="times" size={25} color="red"/>
                </TouchableOpacity>

                <Text className="text-white text-xl font-semibold" style={{marginTop: 7}}>
                    {activeField}
                </Text>
            </View>

            {/* Main Box: Start and Destination Sections */}
            <View className="flex-1 justify-start items-center mt-32">
                <View className="w-11/12 bg-razer-darkGray border border-razer-green rounded-lg p-4">

                    {/* Start Section (Now Editable) */}
                    <View className="flex-row items-center mb-4">
                        <FontAwesome name="circle-o" size={12} color="#00FF00" className="mr-4"/>
                        <View style={{flex: 1}}>
                            <Text className="text-razer-green text-sm font-medium">Start</Text>
                            <TextInput
                                ref={startInputRef} // Attach ref to Start input
                                placeholder="Enter Start Location"
                                placeholderTextColor="gray"
                                value={startLocation}
                                onChangeText={setStartLocation} // Update value when typed
                                style={{
                                    height: 35,
                                    paddingVertical: 2,
                                    color: "white",
                                    borderBottomWidth: 0,
                                }}
                                onFocus={() => {
                                    setActiveField("Start");
                                    destinationInputRef.current?.blur(); // Blur Destination when Start is clicked
                                }}
                            />
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
                                ref={destinationInputRef} // Attach ref to Destination input
                                placeholder="Enter Destination"
                                placeholderTextColor="#A6A6A6"
                                value={destination}
                                onChangeText={setDestination} // Update value when typed
                                style={{
                                    height: 35,
                                    paddingVertical: 2,
                                    color: "white",
                                    borderBottomWidth: 0,
                                }}
                                onFocus={() => {
                                    setActiveField("Destination");
                                    startInputRef.current?.blur(); // Blur Start when Destination is clicked
                                }}
                            />
                        </View>
                    </View>
                </View>

                {/* Conditional Rendering of FlatList Based on Active Field */}
                {activeField === "Start" ? (
                    // Show Favorite Start Locations List
                    <FlatList
                        data={favoriteStarts}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => setStartLocation(item.name)}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 12,
                                    paddingLeft: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#333",
                                    width: "90%",
                                }}
                            >
                                {/* Star Icon */}
                                <FontAwesome name="star" size={20} color="#FFD700" style={{marginRight: 15}}/>

                                {/* Start Location Info */}
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
                ) : (
                    // Show Recent Destinations List
                    <FlatList
                        data={recentDestinations}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => setDestination(item.name)}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 12,
                                    paddingLeft: 20,
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
                )}
            </View>
        </View>
    );
}
