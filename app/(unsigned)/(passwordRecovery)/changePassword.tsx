import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { updateUserEmailPassword } from "@/services/user/userService";

export default function PasswordRecoveryChangePasswordView() {
  const { email } = useLocalSearchParams();
  const { execPromise: fnConfirmPassword, isWaiting } = useWaitingApp<
    { password: string },
    {}
  >({
    functionToWait: (data) =>
      updateUserEmailPassword({
        email: email as string,
        password: data.password,
      }),
    success: () => router.push(`/(unsigned)/login`),
    failure: (error) =>
      alert(`Error al intentar cambiar la contraseña: ${error.message}`),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const handleConfirmPassword = (data: {
    password: string;
    confirmPassword: string;
  }) => {
    fnConfirmPassword({ password: data.password });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.textCenter}>
        Recuperar contraseña
      </ThemedText>

      <View style={styles.formContainer}>
        <SpinnerApp visible={isWaiting}>
          <InputTextApp
            inputControl={{
              control,
              name: "password",
              rules: {
                required: "El campo es requerido",
              },
            }}
            textInputProps={{
              placeholder: "Ingresa una nueva contraseña...",
              secureTextEntry: true,
              autoCapitalize: "none",
            }}
            label="Nueva Contraseña"
            errorMessage={errors.password?.message}
          />
          <InputTextApp
            inputControl={{
              control,
              name: "confirmPassword",
              rules: {
                required: "El campo es requerido",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              },
            }}
            textInputProps={{
              placeholder: "Confirma tu nueva contraseña...",
              secureTextEntry: true,
              autoCapitalize: "none",
            }}
            label="Confirmar Nueva Contraseña"
            errorMessage={errors.confirmPassword?.message}
          />
          <ButtonApp
            label="Confirmar Contraseña"
            onPress={handleSubmit(handleConfirmPassword)}
          />
        </SpinnerApp>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    gap: 10,
  },
  textCenter: {
    textAlign: "center",
  },
  formContainer: {
    justifyContent: "center",
    gap: 20,
  },
});
