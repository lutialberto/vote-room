import { ColorName, useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

export function IconApp(props: {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  colorName?: ColorName;
  color?: string;
  style?: any;
}) {
  const fontColor = useThemeColor({}, props.colorName ?? "icon");
  return (
    <Ionicons
      name={props.name}
      size={props.size}
      color={props.color ?? fontColor}
      style={props.style}
    />
  );
}
