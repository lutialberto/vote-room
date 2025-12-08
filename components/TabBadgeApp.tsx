import { View } from "react-native";

export function TabBadgeApp(props: { visible: boolean }) {
  if (!props.visible) return null;

  return (
    <View
      style={{
        backgroundColor: "#FF3B30",
        borderRadius: 12,
        height: 10,
        aspectRatio: 1,
        position: "absolute",
        right: -10,
      }}
    ></View>
  );
}
