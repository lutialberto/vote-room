import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { useUser } from "@/hooks/useUser";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { createUserEmail } from "@/services/user/userService";
import { User, UserEmailForCreation } from "@/models/User";
import { SpinnerApp } from "@/components/SpinnerApp";
import {
  createUserCode,
  validateEmailCode,
} from "@/services/userCode/userCodeService";

interface EmailCodeValidationForm {
  emailCode: string;
  password: string;
  confirmPassword: string;
}

export default function EmailCodeValidationView() {
  const { userName: userNameEncoded, email } = useLocalSearchParams();
  const userName = decodeURIComponent(userNameEncoded as string);
  const { login } = useUser();
  const { execPromise: fnCreateUserCode, isWaiting: isWaitingCreateUserCode } =
    useWaitingApp({
      functionToWait: () => createUserCode(email as string),
      failure: (error) => alert(`Error al enviar el código: ${error.message}`),
    });
  const {
    execPromise: fnValidateEmailCode,
    isWaiting: isWaitingValidateEmailCode,
  } = useWaitingApp<{ email: string; code: string }, boolean>({
    functionToWait: (data) => validateEmailCode(data),
    success: (isValid) => {
      if (isValid) {
        fnCreateUser({
          userName,
          email: email as string,
          password: watch("password"),
        });
      } else {
        setError("emailCode", { message: "Código de verificación inválido" });
      }
    },
    failure: (error) => alert(`Error al crear el usuario: ${error.message}`),
  });
  const { execPromise: fnCreateUser, isWaiting } = useWaitingApp<
    UserEmailForCreation,
    User
  >({
    functionToWait: (data) => createUserEmail(data),
    success: (user) => login(user),
    failure: (error) => alert(`Error al crear el usuario: ${error.message}`),
  });
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<EmailCodeValidationForm>({
    defaultValues: {
      emailCode: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleEmailValidation = (data: EmailCodeValidationForm) => {
    fnValidateEmailCode({ email: email as string, code: data.emailCode });
  };
  const handleResendCode = () => {
    fnCreateUserCode();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.textCenter}>
        Validación de Email
      </ThemedText>

      <ThemedText style={styles.textCenter}>
        Hemos enviado un código de verificación a tu correo electrónico: {email}
        . Por favor, ingrésalo junto con una contraseña para completar el
        registro.
      </ThemedText>

      <View style={styles.formContainer}>
        <SpinnerApp
          visible={
            isWaiting || isWaitingCreateUserCode || isWaitingValidateEmailCode
          }
        >
          <InputTextApp
            inputControl={{
              control,
              name: "emailCode",
              rules: {
                required: "El campo es requerido",
              },
            }}
            textInputProps={{
              placeholder: "Ingresa el código...",
              keyboardType: "numeric",
            }}
            label="Código"
            errorMessage={errors.emailCode?.message}
          />

          <InputTextApp
            inputControl={{
              control,
              name: "password",
              rules: {
                required: "El campo es requerido",
              },
            }}
            textInputProps={{
              placeholder: "Ingresa una contraseña...",
              autoCapitalize: "none",
            }}
            label="Contraseña"
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
              placeholder: "Confirma tu contraseña...",
              autoCapitalize: "none",
            }}
            label="Confirmar Contraseña"
            errorMessage={errors.confirmPassword?.message}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}
          >
            <ButtonApp
              label="Reenviar Código"
              type="secondary"
              onPress={handleResendCode}
            />
            <ButtonApp
              label="Guardar"
              onPress={handleSubmit(handleEmailValidation)}
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
