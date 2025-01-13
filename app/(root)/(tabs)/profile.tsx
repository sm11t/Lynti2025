import { useUser } from "@clerk/clerk-expo";
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { useAuth } from "@clerk/clerk-expo"; // Import useAuth for signOut

type SectionItem = {
  id: string;
  label: string;
};

type Section = {
  title: string;
  data: SectionItem[];
};

const capitalizeFirstLetter = (str: any) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth(); // Get signOut function from useAuth
  const router = useRouter(); // Get the router to navigate to different tabs

  const sections: Section[] = [
    {
      title: "Account Settings",
      data: [
        { id: "1", label: "Personal Information" },
        { id: "2", label: "Password & Security" },
        { id: "3", label: "Payment Methods" },
        { id: "4", label: "Ride History" },
      ],
    },
    {
      title: "Preferences",
      data: [
        { id: "5", label: "Notifications" },
        { id: "6", label: "Privacy" },
      ],
    },
  ];

  const renderSectionHeader = (title: string) => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#1C1C1E",
      }}
    >
      <Text
        className="text-razer-green"
        style={{ fontSize: 16, fontWeight: "500" }}
      >
        {title}
      </Text>
    </View>
  );

  const renderItem: ListRenderItem<SectionItem> = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#2C2C2E",
        borderBottomWidth: 1,
        borderBottomColor: "#3A3A3C",
      }}
      onPress={() => {
        if (item.label === "Personal Information") {
          router.push("/personalInfo");
        }
        if (item.label === "Password & Security") {
          router.push("/Password_security");
        }
      }}
    >
      <Text style={{ fontSize: 16, color: "#FFFFFF" }}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    try {
      await signOut(); // Sign out from Clerk
      router.push("../../(auth)/sign-in"); // Navigate to the sign-in screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F0F" }}>
      {/* Profile Header */}
      <View
        style={{
          backgroundColor: "#1C1C1E",
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            borderWidth: 3,
            borderColor: "#44D62C",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Image
            source={{
              uri: user?.imageUrl || "https://via.placeholder.com/100",
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          />
        </View>
        <View>
          <Text
            className="text-razer-green"
            style={{ fontSize: 20, fontWeight: "600" }}
          >
            {capitalizeFirstLetter(user?.firstName)}{" "}
            {capitalizeFirstLetter(user?.lastName)}
          </Text>
          <Text style={{ fontSize: 16, color: "#8E8E93" }}>
            {user?.emailAddresses?.[0]?.emailAddress || "No Email Available"}
          </Text>
        </View>
      </View>

      {/* Settings Sections */}
      <FlatList
        data={sections}
        keyExtractor={(section, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            {renderSectionHeader(item.title)}
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </>
        )}
        ListHeaderComponent={() => null}
      />

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginBottom: 75,
          margin: 15,
          padding: 15,
          backgroundColor: "#FF3B30",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "500" }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
