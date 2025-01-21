import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

const PersonalInfo = () => {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for network requests
  const [isError, setIsError] = useState(false); // Error state for handling errors

  // Fetch user data from direct Neon database (via your server)
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-user-data"); // Update with your backend URL
      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setProfileImage(data.profile_image);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Network error:", error);
      setIsError(true); // Set error flag
      Alert.alert(
        "Error",
        "Failed to fetch user data. Please try again later."
      );
    }
  };

  // Save user data to Neon directly (via your server)
  const saveUserData = async () => {
    try {
      setIsLoading(true); // Start loading

      const response = await fetch("http://localhost:5000/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          profile_image: profileImage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data saved:", data);
        Alert.alert("Success", "Your changes have been saved.");
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading when request is complete
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}>
        Personal Information
      </Text>

      {/* Editable Name Field */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>Name</Text>
      <TextInput
        style={{
          backgroundColor: "#f1f1f1",
          padding: 15,
          marginTop: 5,
          borderRadius: 8,
          fontSize: 16,
          opacity: isLoading ? 0.5 : 1,
        }}
        value={name}
        onChangeText={(text) => setName(text)}
        editable={!isLoading}
      />

      {/* Editable Profile Image Field */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>Profile Image URL</Text>
      <TextInput
        style={{
          backgroundColor: "#f1f1f1",
          padding: 15,
          marginTop: 5,
          borderRadius: 8,
          fontSize: 16,
          opacity: isLoading ? 0.5 : 1,
        }}
        value={profileImage}
        onChangeText={(text) => setProfileImage(text)}
        editable={!isLoading}
      />

      {/* Save Button */}
      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#44D62C",
          borderRadius: 8,
          alignItems: "center",
          opacity: isLoading ? 0.5 : 1,
        }}
        onPress={saveUserData}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ fontSize: 16, color: "#FFFFFF" }}>Save</Text>
        )}
      </TouchableOpacity>

      {isError && (
        <Text style={{ color: "red", marginTop: 20, textAlign: "center" }}>
          There was an error fetching the user data. Please try again.
        </Text>
      )}
    </View>
  );
};

export default PersonalInfo;
