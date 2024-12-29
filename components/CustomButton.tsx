import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (bgVariant: string) => {
  switch (bgVariant) {
    case "razerGreen":
      return "bg-razer-green"; // Razer green background
    case "primary":
      return "bg-primary-500"; // Default primary color
    case "secondary":
      return "bg-secondary-500"; // Default secondary color
    default:
      return "bg-razer-green"; // Fallback to Razer green
  }
};

const getTextVariantStyle = (textVariant: string) => {
  switch (textVariant) {
    case "razerBlack":
      return "text-razer-black"; // Razer black text
    case "default":
      return "text-white"; // Default white text
    default:
      return "text-razer-lightGray"; // Fallback to light gray text
  }
};
const CustomButton = ({
  onPress,
  title,
  bgVariant = "bg-razer-green", // Default background
  textVariant = "text-razer-black", // Default text
  IconLeft,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`rounded-full p-3 flex justify-center items-center shadow-md 
      ${bgVariant} ${className}`}
    {...props}
  >
    {IconLeft && <IconLeft />} {/* Google logo rendering here */}
    <Text className={`text-lg font-bold ${textVariant}`}>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;
