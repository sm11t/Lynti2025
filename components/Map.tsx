import React, {useState, useEffect} from "react";
import {ActivityIndicator, View} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {
    const [region, setRegion] = useState(null); // Holds the initial region
    const [loading, setLoading] = useState(true); // Loading indicator

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.error("Permission to access location was denied.");
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01, // Smaller delta for a closer zoom
                    longitudeDelta: 0.01,
                });
                setLoading(false); // Stop loading when location is fetched
            } catch (error) {
                console.error("Error fetching location: ", error);
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    if (loading) {
        // Display a loading indicator while fetching location
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#00FF00"/>
            </View>
        );
    }

    return (
        <MapView
            provider="default"
            style={{
                width: "100%", // Full width of the parent container
                height: "100%", // Full height of the parent container
                borderRadius: 15, // Optional: rounded corners
            }}
            mapType="mutedStandard"
            tintColor="black"
            showsPointsOfInterest={false}
            initialRegion={region} // Set the fetched region dynamically
            showsUserLocation={true}
            userInterfaceStyle="dark"
        />
    );
};

export default Map;
