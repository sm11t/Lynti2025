import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View, TouchableOpacity } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import { useCallback } from "react";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code == "session_exists" || result.code == "success") {
        router.push("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("Oauth error", err);
    }
  }, []);

  return (
    <View className="w-full mt-6">
      {/* Divider */}
      <View className="flex flex-row items-center justify-center mb-4">
        <View className="h-[1px] flex-1 bg-razer-darkGray" />
        <Text className="text-razer-lightGray mx-4">Or</Text>
        <View className="h-[1px] flex-1 bg-razer-darkGray" />
      </View>

      {/* Google Login Button */}
      <TouchableOpacity
        onPress={handleGoogleSignIn}
        className="flex flex-row items-center justify-center bg-white py-3 px-4 rounded-lg shadow-md"
      >
        <Image
          source={icons.google}
          resizeMode="contain"
          className="w-5 h-5 mr-3"
        />
        <Text className="text-black text-base font-JakartaSemiBold">
          Log In with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;
