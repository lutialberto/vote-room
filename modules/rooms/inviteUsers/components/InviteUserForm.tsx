import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { UserInvitation } from "../models/UserInvitation";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { ColorScheme } from "@/constants/Colors";

export default function InviteUserForm({
  handleSubmitForm,
}: {
  handleSubmitForm: (data: UserInvitation) => void;
}) {
  const colors = useThemeColor();
  const styles = getStyles(colors);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UserInvitation>({
    defaultValues: {
      value: undefined,
    },
  });

  const onSubmit = (data: UserInvitation) => {
    reset();
    handleSubmitForm(data);
  };

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputContainer}>
        <InputTextApp
          containerStyle={styles.input}
          inputControl={{
            control,
            name: "value",
          }}
          textInputProps={{
            placeholder: "Ingresar...",
            returnKeyType: "send",
            onSubmitEditing: handleSubmit(onSubmit),
          }}
          label=""
          errorMessage={errors.value?.message}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.addButton}
        >
          <IconApp name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    inputSection: {
      paddingBottom: 10,
      borderTopColor: colors.border,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 12,
    },
    input: {
      flex: 1,
    },
    addButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      shadowColor: colors.primary,
      backgroundColor: colors.primary,
    },
  });
