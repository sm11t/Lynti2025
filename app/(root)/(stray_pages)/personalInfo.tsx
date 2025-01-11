import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export const options = {
  headerShown: false,
};

const PersonalInfo = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F0F" }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "600", color: "#FFFFFF" }}>
          Personal Information
        </Text>

        {/* Add user-specific personal info here */}
        <Text style={{ fontSize: 16, color: "#8E8E93", marginTop: 20 }}>
          {/* Replace with actual user data */}
          Name: John Doe
        </Text>
        <Text style={{ fontSize: 16, color: "#8E8E93", marginTop: 10 }}>
          Email: johndoe@example.com
        </Text>

        {/* Go back to Profile */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 30,
            padding: 15,
            backgroundColor: "#44D62C",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
            Back to Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfo;
