import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

export type RadioButtonAppProps = {
  options: {
    label: string;
    onPress: () => void;
    selected: boolean;
  }[];
  containerStyle?: StyleProp<ViewStyle>;
};

export function RadioButtonApp({
  options,
  containerStyle,
}: RadioButtonAppProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.label}
          onPress={option.onPress}
          style={styles.optionContainer}
        >
          <View
            style={[styles.icon, option.selected ? styles.iconSelected : null]}
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
  iconSelected: {
    backgroundColor: "#0186FF",
  },
});
