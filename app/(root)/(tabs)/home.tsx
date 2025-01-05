import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Map from "@/components/Map";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function HomeScreen() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser();
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

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
    <SafeAreaView className="flex-1 bg-razer-black px-5">
      {/* Greeting Section */}
      <SignedIn>
        <Text className="text-razer-green text-2xl font-JakartaSemiBold mt-16 pl-4">
          Hello {user?.firstName}, Welcome to Lynti!
        </Text>
      </SignedIn>

      <SignedOut>
        <Text className="text-razer-green text-2xl font-JakartaSemiBold mt-16 pl-4">
          Welcome to Lynti! Please sign in to continue.
        </Text>
      </SignedOut>

      {/* Search Bar Section */}
      <View className="flex-row items-center mx-auto mt-6 border border-razer-green bg-razer-darkGray rounded-full h-16 w-11/12 px-4 shadow-lg">
        <FontAwesome name="search" size={20} color="#A6A6A6" />
        <TextInput
          placeholder="Where are you going?"
          placeholderTextColor="#A6A6A6"
          style={{
            fontSize: 18,
            fontFamily: "Inter_400Regular",
          }} // Set font size here
          className="flex-1 text-white ml-3 text-left"
        />
      </View>

      {/*previous rides section*/}

      <Text
        className="px-2
      mt-10 font-JakartaSemiBold text-2xl text-white"
      >
        Recent Trips
      </Text>
      <Text> flat list to be added here</Text>
      <Text> flat list to be added here</Text>
      <Text> flat list to be added here</Text>
      <Text> flat list to be added here</Text>
      <Text> flat list to be added here</Text>

      {/* Map Section */}
      <Text
        className="px-2
      mt-5 font-JakartaSemiBold text-2xl text-white"
      >
        You are here
      </Text>
      <View
        className="flex flex-row items-center bg-transparent h-[300px] px-2
      mt-3"
      >
        <Map />
      </View>

      <Text className="text-white text-center mt-4">
        this text is for testing the dimensions of the map above smitty wit da
        trippy
      </Text>
    </SafeAreaView>
  );
}
