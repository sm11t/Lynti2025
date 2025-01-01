import {TouchableOpacity, Text} from "react-native";
import {ButtonProps} from "@/types/type";

const getBgVariantStyle = (bgVariant: ButtonProps["bgVariant"]) => {
    switch (bgVariant) {
        case "razerGreen":
            return "bg-razer-green"; // Correct mapping
        case "primary":
            return "bg-primary-500";
        case "secondary":
            return "bg-secondary-500";
        default:
            return "bg-razer-green"; // Fallback
    }
};

const getTextVariantStyle = (textVariant: ButtonProps["textVariant"]) => {
    switch (textVariant) {
        case "razerBlack":
            return "text-razer-black";
        case "default":
            return "text-white";
        default:
            return "text-razer-lightGray"; // Fallback
    }
};

const CustomButton = ({
                          onPress,
                          title,
                          bgVariant = "razerGreen", // Logical default value
                          textVariant = "razerBlack",
                          IconLeft,
                          className = "",
                          ...props
                      }: ButtonProps) => (
    <TouchableOpacity
        onPress={onPress}
        className={`rounded-full p-3 flex justify-center items-center shadow-md 
      ${getBgVariantStyle(bgVariant)} ${className}`} // Call getBgVariantStyle here
        {...props}
    >
        {IconLeft && <IconLeft/>}
        <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
            {title}
        </Text>
    </TouchableOpacity>
);

export default CustomButton;
