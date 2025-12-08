import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export type OptionsButtonAppProps = {
  options: {
    label: string;
    onPress: () => void;
    selected: boolean;
  }[];
  containerStyle?: StyleProp<ViewStyle>;
};

export function OptionsButtonApp({
  options,
  containerStyle,
}: OptionsButtonAppProps) {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View
      style={[styles.container, containerStyle, { borderColor: primaryColor }]}
    >
      {options.map((option, index) => (
        <TouchableOpacity key={option.label} onPress={option.onPress}>
          <ThemedText
            style={[
              index > 0
                ? { borderLeftWidth: 1, borderColor: primaryColor }
                : null,
              { padding: 10, backgroundColor: primaryColor },
              !option.selected
                ? {
                    color: primaryColor,
                    backgroundColor: "white",
                  }
                : null,
            ]}
          >
            {option.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
});
