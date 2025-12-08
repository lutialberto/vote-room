import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, ActivityIndicator, View } from "react-native";

export function SpinnerApp(props: {
  visible: boolean;
  children?: React.ReactNode;
}) {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <>
      {props.children}
      {props.visible && (
        <View style={styles.spinnerOverlay}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  spinnerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
