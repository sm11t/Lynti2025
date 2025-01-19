import React, {useState, useRef, useEffect} from "react";
import {View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import {useRouter} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";

export default function SearchScreen() {
    const router = useRouter();
    const [activeField, setActiveField] = useState("Destination");
    const [startLocation, setStartLocation] = useState("Current Location");
    const [destination, setDestination] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState({Start: startLocation, Destination: destination});
    const [searchResults, setSearchResults] = useState([]);
    const startInputRef = useRef(null);
    const destinationInputRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        setTimeout(() => destinationInputRef.current?.focus(), 200);
    }, []);

    // Fetch Google Places Autocomplete results
    const fetchPlaces = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        const API_KEY = "AIzaSyDZQEx9Vp7Q3xaZJ3jYJbMYzkSsnqHE7Ec"; // Replace with your actual API key
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}&components=country:us`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK") {
                setSearchResults(data.predictions.map((place) => ({
                    id: place.place_id,
                    name: place.structured_formatting.main_text,
                    address: place.structured_formatting.secondary_text,
                })));
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    // Handle input change with debounce
    const handleInputChange = (text) => {
        setSearchQuery(text);
        clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            fetchPlaces(text);
        }, 300); // 300ms debounce time
    };

    // Handle selection of a location
    const handleSelectLocation = (location) => {
        if (activeField === "Start") {
            setStartLocation(location.name);
        } else {
            setDestination(location.name);
        }

        // ✅ Store selected location so it persists
        setSelectedLocation((prev) => ({
            ...prev,
            [activeField]: location.name,
        }));

        setSearchQuery(""); // ✅ Clear search query, but keep selected value
        setSearchResults([]); // ✅ Hide results
    };

    // Default saved locations when input is empty
    const savedLocations = activeField === "Start"
        ? [
            {id: "1", name: "ASU Memorial Union", address: "Tempe, AZ"},
            {id: "2", name: "Phoenix Sky Harbor", address: "Phoenix, AZ"},
            {id: "3", name: "Downtown Chandler", address: "Chandler, AZ"},
        ]
        : [
            {id: "1", name: "West 6th", address: "6th St"},
            {id: "2", name: "The Carmin", address: "1000 E Apache Blvd"},
            {id: "3", name: "Scottsdale Fashion Square", address: "E Highland Ave"},
        ];

    return (
        <View className="flex-1 bg-razer-darkGray">
            {/* Top Navigation */}
            <View className="absolute top-16 left-4 right-4 flex-row justify-between items-center">
                <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full">
                    <FontAwesome name="times" size={25} color="red"/>
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold">{activeField}</Text>
                <TouchableOpacity onPress={() => console.log(`Start: ${startLocation}, Destination: ${destination}`)}
                                  className="p-2 rounded-full">
                    <FontAwesome name="check" size={25} color="#00FF00"/>
                </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View className="flex-1 justify-start items-center mt-32">
                <View className="w-11/12 bg-razer-darkGray border border-razer-green rounded-lg p-4">
                    {/* Start Location */}
                    <View className="flex-row items-center mb-4">
                        <FontAwesome name="circle-o" size={12} color="#00FF00" className="mr-4"/>
                        <View style={{flex: 1}}>
                            <Text className="text-razer-green text-sm font-medium">Start</Text>
                            <TextInput
                                ref={startInputRef}
                                placeholder="Enter Start Location"
                                placeholderTextColor="gray"
                                value={activeField === "Start" ? searchQuery || selectedLocation.Start : selectedLocation.Start}
                                onChangeText={handleInputChange}
                                style={{
                                    height: 35,
                                    paddingVertical: 2,
                                    color: "white",
                                    borderBottomWidth: 0,
                                }}
                                onFocus={() => {
                                    setActiveField("Start");
                                    destinationInputRef.current?.blur();
                                    setSearchQuery("");
                                }}
                            />
                        </View>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-600 mb-4"/>

                    {/* Destination */}
                    <View className="flex-row items-center">
                        <FontAwesome name="circle" size={12} color="#00FF00" className="mr-4"/>
                        <View style={{flex: 1}}>
                            <Text className="text-razer-green text-sm font-medium">Destination</Text>
                            <TextInput
                                ref={destinationInputRef}
                                placeholder="Enter Destination"
                                placeholderTextColor="#A6A6A6"
                                value={activeField === "Destination" ? searchQuery || selectedLocation.Destination : selectedLocation.Destination}
                                onChangeText={handleInputChange}
                                style={{
                                    height: 35,
                                    paddingVertical: 2,
                                    color: "white",
                                    borderBottomWidth: 0,
                                }}
                                onFocus={() => {
                                    setActiveField("Destination");
                                    startInputRef.current?.blur();
                                    setSearchQuery("");
                                }}
                            />
                        </View>
                    </View>
                </View>

                {/* Dynamic List (Saved Locations or API Results) */}
                <FlatList
                    data={searchQuery ? searchResults : savedLocations}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => handleSelectLocation(item)}
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
                            <FontAwesome name={searchQuery ? "map-marker" : "star"} size={20}
                                         color={searchQuery ? "#00FF00" : "#FFD700"} style={{marginRight: 15}}/>
                            <View>
                                <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>{item.name}</Text>
                                <Text style={{color: "#A6A6A6", fontSize: 14}}>{item.address}</Text>
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
