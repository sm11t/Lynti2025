import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {SafeAreaView, Text, TextInput, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export default function HomeScreen() {
    const {user} = useUser();

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
                    }} // Set font size here
                    className="flex-1 text-white ml-3 text-left"
                />
            </View>
        </SafeAreaView>
    );
}
