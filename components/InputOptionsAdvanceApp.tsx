import { StyleSheet, View } from "react-native";
import { CardApp } from "./CardApp";
import { ThemedText } from "./ThemedText";
import { IconApp, IconName } from "./IconApp";
import { OptionsButtonApp } from "./OptionsButtonApp";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";

export interface InputOptionsAdvanceAppProps {
  label: string;
  options: InputOptionsAdvanceAppOptionItemProps[];
  isReadOnly: boolean;
}
export interface InputOptionsAdvanceAppOptionItemProps {
  code: string;
  label: string;
  selected?: boolean;
  icon: IconName;
  iconColor?: keyof ColorScheme;
  infoText: string[];
  onPress: () => void;
}

export default function InputOptionsAdvanceApp({
  label,
  options,
  isReadOnly,
}: InputOptionsAdvanceAppProps) {
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.selected) || options[0]
  );
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const scopeOptions = options.map((option) => ({
    code: option.code,
    label: option.label,
    selected: option.label === selectedOption.label,
    onPress: () => {
      if (isReadOnly) return;
      setSelectedOption(option);
      option.onPress();
    },
  }));

  return (
    <View style={styles.section}>
      <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
        {label}
      </ThemedText>
      <OptionsButtonApp options={scopeOptions} />

      <CardApp style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <IconApp
            name={selectedOption.icon}
            size={24}
            colorName={selectedOption.iconColor || "primary"}
          />
          <ThemedText type="defaultSemiBold">{selectedOption.label}</ThemedText>
        </View>
        <ThemedText style={styles.infoText}>
          {selectedOption.infoText.map(
            (line, index) =>
              `• ${line}${index < selectedOption.infoText.length - 1 ? "\n" : ""}`
          )}
        </ThemedText>
      </CardApp>
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    section: {
      marginBottom: 12,
      gap: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    sectionTitle: {
      textAlign: "center",
    },
    infoCard: {
      borderRadius: 12,
      width: "100%",
    },
    infoHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    infoText: {
      opacity: 0.8,
    },
  });
