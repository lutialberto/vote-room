import { IconApp } from "@/components/IconApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export function NewStepMainIcon(props: {
  name: keyof typeof Ionicons.glyphMap;
}) {
  const { primary: color } = useThemeColor();
  return (
    <View
      style={{ backgroundColor: color + "20", borderRadius: 50, padding: 20 }}
    >
      <IconApp name={props.name} size={48} colorName="primary" />
    </View>
  );
}
