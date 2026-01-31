import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { useUser } from "@/contexts/UserContext";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { fetchUserByEmail } from "@/services/user/userService";
import { User } from "@/models/User";
import { SpinnerApp } from "@/components/SpinnerApp";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginView() {
  const { switchUser } = useUser();
  const { execPromise: loginWithCredentials, isWaiting } = useWaitingApp<
    LoginForm,
    User
  >({
    functionToWait: (data) => {
      //TODO: falta chequeo de contraseña valida
      return fetchUserByEmail(data.email);
    },
    success: (user) => {
      switchUser(user);
      router.replace("/(tabs)/exploreRooms/byCode");
    },
    failure: () =>
      setError("password", { message: "Credenciales incorrectas" }),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = (data: LoginForm) => {
    loginWithCredentials(data);
  };

  const handleFacebookLogin = () => {
    //TODO: implementar login con facebook
    alert("Funcionalidad de inicio de sesión con Facebook no implementada.");
  };

  const handleGoogleLogin = () => {
    //TODO: implementar login con google
    alert("Funcionalidad de inicio de sesión con Google no implementada.");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.textCenter}>
        Recupera tu Cuenta
      </ThemedText>
      <View style={styles.formContainer}>
        <SpinnerApp visible={isWaiting}>
          <InputTextApp
            inputControl={{
              control,
              name: "email",
              rules: {
                required: "El campo es requerido",
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
              secureTextEntry: true,
              autoCapitalize: "none",
            }}
            label="Contraseña"
            errorMessage={errors.password?.message}
          />

          <ButtonApp
            label="Iniciar Sesión"
            onPress={handleSubmit(handleLogin)}
          />
          <ButtonApp
            type="outline"
            label="Iniciar Sesión con Facebook"
            icon="logo-facebook"
            onPress={handleFacebookLogin}
          />
          <ButtonApp
            type="outline"
            label="Iniciar Sesión con Google"
            icon="logo-google"
            onPress={handleGoogleLogin}
          />
        </SpinnerApp>
      </View>
      <View style={{ marginVertical: 20, gap: 10 }}>
        <ThemedText type="subtitle" style={styles.textCenter}>
          Aún no tenés una cuenta?
        </ThemedText>
        <ButtonApp
          label="Registrarse"
          type="secondary"
          onPress={() => router.replace("/userCreation/new")}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
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
