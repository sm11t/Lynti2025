import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PasswordAndSecurity = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const navigation = useNavigation();

  const toggle2FA = () => {
    setIs2FAEnabled((prev) => !prev);
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

      {/* Current Password Field */}
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
          secureTextEntry
          placeholder="Enter current password"
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Ionicons name="eye" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity
        onPress={() => {}}
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#44D62C",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
          Change Password
        </Text>
      </TouchableOpacity>

      <View
        style={{
          marginTop: 25,
          width: "100%",
          height: 0.75,
          backgroundColor: "#44D62C",
          borderRadius: 1,
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
            navigation.goBack();
          }}
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#767577",
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
