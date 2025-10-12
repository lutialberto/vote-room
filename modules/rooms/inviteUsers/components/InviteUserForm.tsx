import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserInvitation } from "../models/UserInvitation";

export default function InviteUserForm({
  handleSubmitForm,
}: {
  handleSubmitForm: (data: UserInvitation) => void;
}) {
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
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 16,
    paddingBottom: 24,
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
    backgroundColor: "#0186FF",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0186FF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
