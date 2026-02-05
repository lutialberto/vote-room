import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { useUser } from "@/hooks/useUser";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { createUser, createUserEmail } from "@/services/user/userService";
import { User, UserEmailForCreation, UserForm } from "@/models/User";
import { SpinnerApp } from "@/components/SpinnerApp";

interface EmailCodeValidationForm {
  emailCode: string;
  password: string;
  confirmPassword: string;
}

export default function EmailCodeValidationView() {
  const { userName, email } = useLocalSearchParams();
  const { login } = useUser();
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
    formState: { errors },
  } = useForm<EmailCodeValidationForm>({
    defaultValues: {
      emailCode: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleEmailValidation = (data: EmailCodeValidationForm) => {
    //TODO: implementar validación de código de email
    //TODO: implementar chequeo y guardado de contraseña
    fnCreateUser({
      userName: userName as string,
      email: email as string,
    });
  };
  const handleResendCode = () => {
    //TODO: implementar reenvio de código
    alert("Funcionalidad de reenvío de código no implementada.");
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
        <SpinnerApp visible={isWaiting}>
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

          <ButtonApp
            label="Guardar"
            onPress={handleSubmit(handleEmailValidation)}
          />

          <ButtonApp label="Reenviar Código" onPress={handleResendCode} />
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
