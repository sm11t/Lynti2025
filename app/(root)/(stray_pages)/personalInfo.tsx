import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const PersonalInfo = () => {
  const { user } = useUser();
  const router = useRouter();

  const [name, setName] = useState(user?.fullName || "John Doe");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.imageUrl || null
  );
  const [originalName, setOriginalName] = useState(
    user?.fullName || "John Doe"
  );
  const [originalImage, setOriginalImage] = useState<string | null>(
    user?.imageUrl || null
  );

  const [isChanged, setIsChanged] = useState(false);

  // Detect changes
  useEffect(() => {
    if (name !== originalName || profileImage !== originalImage) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [name, profileImage, originalName, originalImage]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (isChanged) {
      // Save logic can go here (e.g., API calls)
      setOriginalName(name);
      setOriginalImage(profileImage);
    }
    router.back(); // Redirect to the profile page
  };

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
          onPress={pickImage}
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: profileImage || "https://via.placeholder.com/100",
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
          value={name}
          onChangeText={setName}
        />

        {/* Save/Done Button */}
        <TouchableOpacity
          onPress={handleSave}
          style={{
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
            width: "90%",
            padding: 15,
            backgroundColor: isChanged ? "#44D62C" : "#444444",
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
            {isChanged ? "Save" : "Done"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfo;
