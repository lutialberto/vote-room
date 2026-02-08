import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { User } from "@/models/User";
import { SpinnerApp } from "@/components/SpinnerApp";
import {
  createUserCode,
  validateEmailCode,
} from "@/services/userCode/userCodeService";

export default function UserCreationNewView() {
  const { email } = useLocalSearchParams();
  const { execPromise: fnResendCode, isWaiting: isWaitingResend } =
    useWaitingApp<{ email: string }, { email: string }>({
      functionToWait: (data) => createUserCode(data.email),
      failure: (error) => alert(`Error al validar el código: ${error.message}`),
    });
  const { execPromise: fnValidateCode, isWaiting: isWaitingValidate } =
    useWaitingApp<{ code: string }, boolean>({
      functionToWait: (data) =>
        validateEmailCode({ email: email as string, code: data.code }),
      success: (isValid) => {
        if (!isValid) {
          router.push(
            `/(unsigned)/(passwordRecovery)/changePassword?email=${email}`
          );
        } else {
          setError("code", { message: "Código de verificación inválido" });
        }
      },
      failure: (error) => alert(`Error al validar el código: ${error.message}`),
    });
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ code: string }>({
    defaultValues: {
      code: "",
    },
  });
  const handleResendCode = () => {
    fnResendCode({ email: email as string });
  };
  const handleValidateCode = (data: { code: string }) => {
    fnValidateCode({ code: data.code });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.textCenter}>
        Recuperar contraseña
      </ThemedText>
      <ThemedText type="subtitle" style={styles.textCenter}>
        Hemos enviado un código de verificación a tu correo electrónico: {email}
        . Por favor, revisa tu bandeja de entrada para continuar con el proceso
        de recuperación de contraseña.
      </ThemedText>

      <View style={styles.formContainer}>
        <SpinnerApp visible={isWaitingResend || isWaitingValidate}>
          <InputTextApp
            inputControl={{
              control,
              name: "code",
              rules: {
                required: "El campo es requerido",
              },
            }}
            textInputProps={{
              placeholder: "Ingresa el código de verificación...",
              keyboardType: "numeric",
            }}
            label="Código de Verificación"
            errorMessage={errors.code?.message}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ButtonApp
              label="Reenviar Código"
              type="secondary"
              onPress={handleResendCode}
            />
            <ButtonApp
              label="Validar Código"
              onPress={handleSubmit(handleValidateCode)}
            />
          </View>
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
