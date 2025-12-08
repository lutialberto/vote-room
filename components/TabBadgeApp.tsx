import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";

export function TabBadgeApp(props: { visible: boolean }) {
  const redColor = useThemeColor({}, "red");
  if (!props.visible) return null;

  return (
    <View
      style={{
        backgroundColor: redColor,
        borderRadius: 12,
        height: 10,
        aspectRatio: 1,
        position: "absolute",
        right: -10,
      }}
    ></View>
  );
}
