import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { useUser } from "@/hooks/useUser";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { createUser } from "@/services/user/userService";
import { User, UserForm } from "@/models/User";
import { SpinnerApp } from "@/components/SpinnerApp";

export default function UserCreationNewView() {
  const { login } = useUser();
  const { execPromise: fnCreateUser, isWaiting } = useWaitingApp<
    UserForm,
    User
  >({
    functionToWait: (data) => createUser(data),
    success: (user) => login(user),
    failure: (error) => alert(`Error al crear el usuario: ${error.message}`),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: {
      userName: "",
      email: "",
    },
  });
  const handleCompleteUserCreation = (data: UserForm) => {
    if (data.email === "") {
      fnCreateUser(data);
    } else {
      //TODO: falta chequeo de email unico
      //TODO: falta implementar envio de codigo de verificacion por email
      //TODO: falta depurar campos al pasar por query params
      router.replace(
        `/userCreation/(emailRegistration)/emailCodeValidation?email=${data.email}&userName=${data.userName}`
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.textCenter}>
        ¡Crea tu Usuario!
      </ThemedText>

      <View style={styles.formContainer}>
        <SpinnerApp visible={isWaiting}>
          <InputTextApp
            inputControl={{
              control,
              name: "userName",
              rules: {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              },
            }}
            textInputProps={{
              placeholder: "Ingresa un nombre de usuario...",
            }}
            label="Nombre de Usuario"
            errorMessage={errors.userName?.message}
          />

          <InputTextApp
            inputControl={{
              control,
              name: "email",
              rules: {
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
            label="Correo Electrónico (opcional)"
            errorMessage={errors.email?.message}
          />
          <ThemedText type="hint">
            El correo electrónico es opcional, pero te permitirá recuperar tu
            cuenta en caso de que olvides tu nombre de usuario.
          </ThemedText>

          <ButtonApp
            label="Crear Usuario"
            onPress={handleSubmit(handleCompleteUserCreation)}
          />
        </SpinnerApp>
      </View>
      <View style={{ marginVertical: 20, gap: 10 }}>
        <ThemedText type="subtitle" style={styles.textCenter}>
          Ya tenés una cuenta?
        </ThemedText>
        <ButtonApp
          label="Iniciar Sesión"
          type="secondary"
          onPress={() => router.replace("/userCreation/login")}
        />
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
