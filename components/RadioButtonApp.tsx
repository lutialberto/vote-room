import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export type RadioButtonAppOption = {
  label: string;
  selected: boolean;
  value: string;
};

export type RadioButtonAppProps = {
  options: RadioButtonAppOption[];
  onPress: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  enabled?: boolean;
};

export function RadioButtonApp({
  options,
  containerStyle,
  onPress,
  enabled = true,
}: RadioButtonAppProps) {
  const colors = useThemeColor();
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.label}
          onPress={() => onPress(option.value)}
          style={styles.optionContainer}
          disabled={!enabled}
        >
          <View
            style={[
              styles.icon,
              { borderColor: colors.border },
              option.selected ? { backgroundColor: colors.primary } : null,
              !enabled ? { backgroundColor: colors.border } : null,
            ]}
          ></View>
          <ThemedText type="defaultSemiBold">{option.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "70%",
  },
  icon: {
    aspectRatio: 1,
    width: 15,
    borderRadius: "100%",
    borderWidth: 2,
  },
});
