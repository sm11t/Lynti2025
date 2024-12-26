import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-red-200">
      <Text className="text-lg text-blue-600 font-bold">Sign up</Text>
    </SafeAreaView>
  );
}
