import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {SafeAreaView, Text} from "react-native";

export default function HomeScreen() {
    const {user} = useUser();

    return (
        <SafeAreaView className="flex-1 bg-razer-black px-5">
            {/* Greeting Section */}
            <SignedIn>
                <Text className="text-razer-green text-2xl font-JakartaSemiBold mt-10">
                    Hello {user?.firstName}, Welcome to Lynti!
                </Text>
            </SignedIn>

            <SignedOut>
                <Text className="text-razer-green text-2xl font-JakartaSemiBold mt-10">
                    Welcome to Lynti! Please sign in to continue.
                </Text>
            </SignedOut>
        </SafeAreaView>
    );
}
