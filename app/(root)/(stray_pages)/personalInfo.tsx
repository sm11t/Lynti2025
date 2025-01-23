import React from "react";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalInfo = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F0F" }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#44D62C",
            textAlign: "center",
          }}
        >
          Personal Information
        </Text>

        {/* Profile Picture Section */}
        <TouchableOpacity
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: "https://via.placeholder.com/100",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#FFFFFF",
            }}
          />
          <Text style={{ fontSize: 16, color: "#44D62C", marginTop: 10 }}>
            Edit Profile Picture
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 0.75,
            backgroundColor: "#44D62C", // Razer Green
            borderRadius: 1, // Rounded edges
          }}
        />

        {/* Editable Name Field */}
        <Text
          style={{
            fontSize: 16,
            color: "#8E8E93",
            marginTop: 20,
            marginLeft: 5,
          }}
        >
          Name
        </Text>
        <TextInput
          style={{
            backgroundColor: "#1C1C1E",
            color: "#FFFFFF",
            padding: 15,
            marginTop: 5,
            borderRadius: 8,
            fontSize: 16,
          }}
        />

        {/* Save/Done Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
            width: "90%",
            padding: 15,
            backgroundColor: "#44D62C",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
              fontWeight: "500",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfo;
