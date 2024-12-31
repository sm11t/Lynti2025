import { View, Text, Animated, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import { icons, images } from "@/constants";
import { useState } from "react";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";

// 1. Import Clerk hooks
import { useSignIn } from "@clerk/clerk-expo";

export default function SignIn() {
  // 2. Setup Clerk sign-in
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  // Existing form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 3. Implement Clerk sign-in logic
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        // Sign-in is complete! Activate the session and redirect
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If not complete, handle further steps (MFA, email OTP, etc.)
        console.error(
          "Sign-in step incomplete:",
          JSON.stringify(signInAttempt, null, 2),
        );
      }
    } catch (err) {
      console.error("Sign-in error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-razer-black">
      <View className="flex-1 bg-razer-black">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome to Sign In
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            placeholderTextColor="#555"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm((prevForm) => ({
                ...prevForm,
                email: value,
              }))
            }
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            placeholderTextColor="#555"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) =>
              setForm((prevForm) => ({
                ...prevForm,
                password: value,
              }))
            }
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have an Account? </Text>
            <Text className="text-razer-green">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
