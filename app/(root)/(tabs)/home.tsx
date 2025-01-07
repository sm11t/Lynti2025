import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import Map from "@/components/Map";
import {useLocationStore} from "@/store";
import {useEffect, useState} from "react";
import * as Location from "expo-location";

export default function HomeScreen() {
    const {setUserLocation} = useLocationStore();
    const {user} = useUser();
    const [hasPermissions, setHasPermissions] = useState(false);

    const recentDestinations = [
        {name: "West Sixth Tempe", address: "526 S Mill Ave, Tempe"},
        {name: "Macy's", address: "Fashion Park, Macy's"},
        {name: "The Carmin", address: "1000 E Apache Blvd, Tempe"},
    ];

    useEffect(() => {
        const requestLocation = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();

            if (status != "granted") {
                setHasPermissions(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync();

            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords?.latitude!,
                longitude: location.coords?.longitude!,
            });

            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                address: `${address[0].name}, ${address[0].region}`,
            });
        };
        requestLocation();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-razer-black">
            <ScrollView>
                {/* Hamburger Menu */}
                <View
                    style={{
                        position: "absolute",
                        top: 8, // Decrease this value to move it further up
                        left: 20,
                        zIndex: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => console.log("Open Dashboard")}
                        style={{
                            padding: 10,
                            borderRadius: 5,
                        }}
                    >
                        {/* Hamburger Icon */}
                        <View>
                            {Array(3)
                                .fill(null)
                                .map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            height: 3,
                                            backgroundColor: "#00FF00", // Razer Green
                                            marginVertical: 2, // Space between lines
                                            width: 25, // Line width
                                        }}
                                    />
                                ))}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Greeting Section */}
                <SignedIn>
                    <Text className="text-razer-green text-2xl font-JakartaSemiBold mt-16 pl-7">
                        Hello {user?.firstName}, Welcome to Lynti!
                    </Text>
                </SignedIn>

                <SignedOut>
                    <Text className="text-razer-green text-2xl font-JakartaSemiBold mt-16 pl-7">
                        Welcome to Lynti! Please sign in to continue.
                    </Text>
                </SignedOut>

                {/* Search Bar Section */}
                <View
                    className="flex-row items-center mx-auto mt-6 border border-razer-green bg-razer-darkGray rounded-full h-16 w-11/12 px-4 shadow-lg"
                >
                    <FontAwesome name="search" size={20} color="#A6A6A6"/>
                    <TextInput
                        placeholder="Where are you going?"
                        placeholderTextColor="#A6A6A6"
                        style={{
                            fontSize: 18,
                            fontFamily: "Inter_400Regular",
                        }}
                        className="flex-1 text-white ml-3 text-left"
                    />
                </View>

                {/* Schedule Button */}
                <View
                    className="flex-row items-center mx-auto mt-3"
                    style={{
                        width: "91.666%", // Width matching the search bar
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#1E1E1E", // Same color as the search bar (bg-razer-darkGray)
                            borderRadius: 20,
                            paddingHorizontal: 15,
                            paddingVertical: 8,
                            shadowColor: "#000",
                            shadowOpacity: 0.4, // Increased shadow visibility
                            shadowRadius: 8, // More prominent shadow
                            shadowOffset: {width: 0, height: 4}, // Adjusted shadow offset
                        }}
                    >
                        <FontAwesome name="calendar" size={16} color="#FFFFFF"/>
                        <Text
                            style={{
                                marginLeft: 8,
                                fontSize: 14,
                                fontFamily: "Inter_600SemiBold",
                                color: "#FFFFFF", // Whitish color for better visibility
                            }}
                        >
                            Schedule
                        </Text>
                        <FontAwesome
                            name="chevron-down"
                            size={12} // Smaller dropdown icon size
                            color="#FFFFFF"
                            style={{marginLeft: 8}}
                        />
                    </TouchableOpacity>
                </View>

                {/* Recent Destinations Section */}
                <View
                    className="mt-5"
                    style={{
                        marginHorizontal: "auto",
                        width: "91.666%", // Width matching the search bar
                    }}
                >
                    {recentDestinations.map((item, index) => (
                        <View className="flex-row items-center mt-3" key={index}>
                            <FontAwesome name="map-marker" size={20} color="#00FF00"/>
                            <View className="ml-3">
                                <Text className="text-white text-lg font-JakartaSemiBold">
                                    {item.name}
                                </Text>
                                <Text className="text-gray-400 text-sm">{item.address}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Map Section */}
                <View style={{marginTop: 20}}>
                    <Text
                        className="font-JakartaSemiBold text-2xl text-white mb-3"
                        style={{marginLeft: "7.5%"}} // Aligns text with the left edge of the map
                    >
                        You are here
                    </Text>
                    <View
                        style={{
                            height: 300, // Reduced height for the map
                            width: "85%", // Adjusted width for equal padding
                            alignSelf: "center", // Centered horizontally
                            borderRadius: 15, // Rounded corners for the map box
                            borderWidth: 1, // Outline for the map
                            borderColor: "#A6A6A6", // Clean grey outline color
                            overflow: "hidden", // Ensures rounded corners apply to the map content
                        }}
                    >
                        <Map/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
