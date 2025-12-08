import { ColorName, useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

export function IconApp(props: {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  colorName?: ColorName;
  color?: string;
  style?: any;
}) {
  const colors = useThemeColor();
  return (
    <Ionicons
      name={props.name}
      size={props.size}
      color={props.color ?? colors[props.colorName ?? "icon"]}
      style={props.style}
    />
  );
}
