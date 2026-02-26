import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { IconApp } from "./IconApp";
import { BaseNavigationContainer } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ColorScheme } from "@/constants/Colors";

export interface InputSelectAppProps<T extends FieldValues> {
  formControl: UseControllerProps<T>;
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  options: InputSelectAppOptionProps[];
  enabled?: boolean;
}
export interface InputSelectAppOptionProps {
  label: string;
  value: string;
}

export default function InputSelectApp<T extends FieldValues>({
  options,
  formControl,
  label,
  error,
  containerStyle,
  enabled = true,
}: InputSelectAppProps<T>) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const { field } = useController(formControl);
  const colors = useThemeColor();
  const styles = getStyles(colors);

  return (
    <ThemedView style={containerStyle}>
      {label && <ThemedText type="inputLabel">{label}</ThemedText>}
      <View style={styles.containerStyle}>
        <Pressable
          onPress={() => setOptionsVisible(true)}
          style={{ flex: 1 }}
          disabled={!enabled}
        >
          <ThemedText>{field.value?.label}</ThemedText>
        </Pressable>
        {field.value?.label && enabled && (
          <Pressable
            onPress={() => field.onChange({ label: "", value: "" })}
            style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 30,
              padding: 5,
            }}
          >
            <IconApp name="close" size={20} color="text" />
          </Pressable>
        )}
        <Modal
          visible={optionsVisible}
          onRequestClose={() => setOptionsVisible(false)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              gap: 10,
            }}
          >
            <ThemedText
              type="subtitle"
              style={{
                textAlign: "center",
              }}
            >
              Selecciona...
            </ThemedText>
            <Pressable
              onPress={() => setOptionsVisible(false)}
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 30,
                padding: 5,
                position: "absolute",
                right: 20,
              }}
            >
              <IconApp name="close" size={20} color="text" />
            </Pressable>
          </View>
          <ScrollView>
            {options?.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  field.onChange(option);
                  setOptionsVisible(false);
                }}
                style={[
                  { paddingHorizontal: 20 },
                  option.value === field.value?.value && {
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <ThemedText style={styles.itemStyle}>{option.label}</ThemedText>
              </Pressable>
            ))}
            {options.length === 0 && (
              <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
                No hay opciones disponibles
              </ThemedText>
            )}
          </ScrollView>
        </Modal>
      </View>
      {error && <ThemedText type="inputError">{error}</ThemedText>}
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    containerStyle: {
      flexDirection: "row",
      alignItems: "center",
      padding: 6,
      gap: 4,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      paddingBottom: 0,
    },
    itemStyle: {
      paddingVertical: 10,
    },
  });
