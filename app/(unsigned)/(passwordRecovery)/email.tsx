import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { createUserCode } from "@/services/userCode/userCodeService";
import { checkUserByEmail } from "@/services/user/userService";

export default function PasswordRecoveryEmailView() {
  const { execPromise: fnCheckUserEmail, isWaiting: isWaitingCheckEmail } =
    useWaitingApp<{ email: string }, boolean>({
      functionToWait: (data) => checkUserByEmail(data.email),
      success: (exists) => {
        if (!exists) {
          setError("email", {
            message: "El correo electrónico no está registrado.",
          });
        } else {
          fnSendVerificationCode({ email: watch("email") });
        }
      },
      failure: (error) =>
        alert(`Error al chequear el correo electrónico: ${error.message}`),
    });
  const { execPromise: fnSendVerificationCode, isWaiting } = useWaitingApp<
    { email: string },
    { email: string }
  >({
    functionToWait: (data) => createUserCode(data.email),
    success: (data) =>
      router.push(
        `/(unsigned)/(passwordRecovery)/emailValidation?email=${data.email}`
      ),
    failure: (error) =>
      alert(`Error al intentar enviar el código: ${error.message}`),
  });
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });
  const handleSendVerificationCode = (data: { email: string }) => {
    fnCheckUserEmail({ email: data.email });
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
              name: "email",
              rules: {
                required: "El campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Correo electrónico inválido",
                },
              },
            }}
            textInputProps={{
              placeholder: "Ingresa un correo electrónico...",
              keyboardType: "email-address",
              autoCapitalize: "none",
            }}
            label="Correo Electrónico"
            errorMessage={errors.email?.message}
          />
          <ButtonApp
            label="Enviar código de verificación"
            onPress={handleSubmit(handleSendVerificationCode)}
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
