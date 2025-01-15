import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PasswordAndSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation(); // Initialize navigation hook

  // Updated regex for password validation
  const validatePassword = (password: any) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000", {
        userId: "user_id_here", // Replace with logged-in user's ID
        currentPassword,
        newPassword,
      });

      alert(response.data.message); // Success message
      setIsChangingPassword(false); // Reset form state
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        alert(error.response?.data?.message || "Error changing password");
      } else if (error instanceof Error) {
        // General JavaScript error handling
        alert(error.message);
      } else {
        // Unknown error handling
        alert("An unexpected error occurred");
      }
    }
  };

  const toggle2FA = () => {
    setIs2FAEnabled((prev) => !prev);

    // Implement logic to enable/disable 2FA (API call)
    alert(`2FA ${is2FAEnabled ? "disabled" : "enabled"} successfully!`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F0F", padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          color: "#44D62C",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Password & Security
      </Text>

      {/* Current Password */}
      {!isChangingPassword && (
        <>
          <Text style={{ color: "#8E8E93", marginBottom: 5 }}>
            Current Password
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "#1C1C1E",
                color: "#FFFFFF",
                padding: 15,
                borderRadius: 8,
                fontSize: 16,
              }}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor="#8E8E93"
              editable={!isChangingPassword} // Lock the field when changing password
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword((prev) => !prev)}
              style={{ marginLeft: 10 }}
            >
              <Ionicons
                name={showCurrentPassword ? "eye-off" : "eye"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Subtext under Current Password */}
      {!isChangingPassword && (
        <Text style={{ color: "#8E8E93", marginTop: 10 }}>
          Don't share your password with anyone.
        </Text>
      )}

      {/* Change Password Button - only show if not changing password */}
      {!isChangingPassword && (
        <TouchableOpacity
          onPress={() => {
            setIsChangingPassword(true); // Open password change fields
          }}
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#44D62C", // Green color for "Change Password"
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
            Change Password
          </Text>
        </TouchableOpacity>
      )}

      {/* New Password and Confirm Password (Only show when changing password) */}
      {isChangingPassword && (
        <>
          <Text style={{ color: "#8E8E93", marginBottom: 5, marginTop: 20 }}>
            New Password
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "#1C1C1E",
                color: "#FFFFFF",
                padding: 15,
                borderRadius: 8,
                fontSize: 16,
              }}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholder="Enter new password"
              placeholderTextColor="#8E8E93"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword((prev) => !prev)}
              style={{ marginLeft: 10 }}
            >
              <Ionicons
                name={showNewPassword ? "eye-off" : "eye"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={{ color: "#8E8E93", marginBottom: 5, marginTop: 20 }}>
            Confirm Password
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "#1C1C1E",
                color: "#FFFFFF",
                padding: 15,
                borderRadius: 8,
                fontSize: 16,
              }}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor="#8E8E93"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword((prev) => !prev)}
              style={{ marginLeft: 10 }}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* Password Requirements Subtext */}
          <Text style={{ color: "#8E8E93", marginTop: 10, fontSize: 12 }}>
            Password must be at least 8 characters long, contain at least 1
            uppercase letter, 1 lowercase letter, and 1 number.
          </Text>

          {/* Error message for invalid password */}
          {passwordError && (
            <Text style={{ color: "#F44336", marginTop: 10, fontSize: 14 }}>
              {passwordError}
            </Text>
          )}

          {/* Save New Password Button */}
          <TouchableOpacity
            onPress={handlePasswordChange}
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: "#44D62C", // Green color for "Save New Password"
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
              Save New Password
            </Text>
          </TouchableOpacity>

          {/* Not Now Button */}
          <TouchableOpacity
            onPress={() => {
              setIsChangingPassword(false); // Close the password change fields
            }}
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: "#F44336", // Red color for "Not Now"
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
              Not Now
            </Text>
          </TouchableOpacity>
        </>
      )}

      <View
        style={{
          marginTop: 25,
          width: "100%",
          height: 0.75,
          backgroundColor: "#44D62C", // Razer Green
          borderRadius: 1, // Rounded edges
        }}
      />

      {/* 2FA Toggle */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "500" }}>
          Enable Two-Factor Authentication (2FA)
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#44D62C" }}
          thumbColor={is2FAEnabled ? "#FFFFFF" : "#f4f3f4"}
          onValueChange={toggle2FA}
          value={is2FAEnabled}
        />
      </View>

      {/* Subtext under 2FA */}
      <Text style={{ color: "#8E8E93", marginTop: 10 }}>
        Two-Factor Authentication adds an extra layer of security to your
        account by requiring both your password and a secondary verification
        method.
      </Text>

      {/* Done Button */}
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(); // Go back when Done is pressed
          }}
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#767577", // Gray color for "Done"
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordAndSecurity;
