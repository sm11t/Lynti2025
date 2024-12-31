import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {/* Label */}
          {label && (
            <Text
              className={`text-base text-razer-lightGray font-JakartaSemiBold mb-2 ${labelStyle}`}
            >
              {label}
            </Text>
          )}

          {/* Input Field Container */}
          <View
            className={`flex flex-row justify-start items-center bg-razer-darkGray rounded-lg border border-razer-darkGray focus:border-razer-green ${containerStyle}`}
          >
            {/* Icon */}
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}

            {/* Text Input */}
            <TextInput
              className={`p-4 font-Jakarta text-[15px] flex-1 text-razer-lightGray ${inputStyle}`}
              placeholderTextColor="#A6A6A6" // Placeholder color for visibility
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
