import {View, Text, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";

export default function SearchScreen() {
    const router = useRouter(); // Router for navigation

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000", // Razer Black
            }}
        >
            {/* Title */}
            <Text
                style={{
                    fontSize: 24,
                    color: "#00FF00", // Razer Green
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Search Page
            </Text>

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.push("/(root)/(tabs)/home")} // Navigate back to home
                style={{
                    padding: 10,
                    backgroundColor: "#1E1E1E", // Grey background
                    borderRadius: 5,
                }}
            >
                <Text
                    style={{
                        color: "#FFF",
                        fontSize: 16,
                    }}
                >
                    Go Back to Home
                </Text>
            </TouchableOpacity>
        </View>
    );
}
