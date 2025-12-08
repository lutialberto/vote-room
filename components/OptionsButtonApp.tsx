import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";

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
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => (
        <TouchableOpacity key={option.label} onPress={option.onPress}>
          <ThemedText
            style={[
              index > 0
                ? { borderLeftWidth: 1, borderColor: colors.primary }
                : null,
              { padding: 10, backgroundColor: colors.primary },
              !option.selected
                ? {
                    color: colors.primary,
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

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 8,
      overflow: "hidden",
      borderColor: colors.primary,
    },
  });
