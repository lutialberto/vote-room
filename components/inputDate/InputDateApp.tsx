import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import {
  AndroidNativeProps,
  DateTimePickerEvent,
  IOSNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import InputDateImpDefault from "./InputDateImp";

export interface InputDateAppProps<T extends FieldValues> {
  label?: string;
  error?: string;
  formControl: UseControllerProps<T>;
  containerStyle?: StyleProp<ViewStyle>;
  dateInput?: {
    formatDate?: (date: Date | undefined) => string;
    datePickerConfig?: DatePickerConfigProps;
  };
}

export type DatePickerConfigProps =
  | IOSNativeProps
  | AndroidNativeProps
  | WindowsNativeProps;

function InputDateApp<T extends FieldValues>({
  formControl,
  label,
  error,
  containerStyle,
  dateInput,
}: InputDateAppProps<T>) {
  const { field } = useController(formControl);
  const [visible, setVisible] = useState(false);
  const colors = useThemeColor();

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    const updateValue = event.type !== "dismissed";
    if (updateValue) {
      field.onChange(date);
    }
    setVisible(false);
  };

  const dateTimeConfig: DatePickerConfigProps = {
    ...dateInput?.datePickerConfig,
    value: field.value ?? new Date(),
    onChange: handleChange,
    display: "spinner",
    is24Hour: true,
    design: "default",
    positiveButton: {
      textColor: colors.text,
    },
    negativeButton: {
      textColor: colors.text,
    },
  };

  const formatDate = (date?: Date) => {
    if (date === undefined) return "";
    if (dateInput?.formatDate) return dateInput?.formatDate(date);
    return date?.toLocaleDateString();
  };

  return (
    <ThemedView style={containerStyle}>
      <ThemedText type="inputLabel">{label}</ThemedText>
      <Pressable style={styles.textContainer} onPress={() => setVisible(true)}>
        <ThemedText>{formatDate(field.value ?? new Date())}</ThemedText>
      </Pressable>
      <InputDateImpDefault
        visible={visible}
        value={field.value}
        dateTimePickeckProps={dateTimeConfig}
      />
      {error && <ThemedText type="inputError">{error}</ThemedText>}
    </ThemedView>
  );
}

export default InputDateApp;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
    padding: 6,
    gap: 4,
  },
  textContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
});
