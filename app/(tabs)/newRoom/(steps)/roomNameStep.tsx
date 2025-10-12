import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { ButtonApp } from "@/components/ButtonApp";
import InputTextApp from "@/components/InputTextApp";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormStepCard from "@/components/FormStepCard";

type FormData = {
  name: string;
  description: string;
};

export default function RoomNameStep() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = (data: FormData) => {
    // TODO: falta definir que hacer con los datos
    router.navigate("/(tabs)/newRoom/(steps)/roomTypeStep");
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="people" size={48} color="#007AFF" />
              </View>
              <ThemedText type="title" style={styles.title}>
                🗳️ Crea tu Sala de Votación
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Invita a otros usuarios a participar en votaciones que vos
                generes
              </ThemedText>
            </View>

            <FormStepCard
              stepNumber={1}
              instructions="Para comenzar, define un nombre y una descripción (opcional)"
            />

            <View style={styles.formContainer}>
              <InputTextApp
                inputControl={{
                  control,
                  name: "name",
                  rules: {
                    required: "El nombre es requerido",
                    minLength: {
                      value: 3,
                      message: "Mínimo 3 caracteres",
                    },
                  },
                }}
                textInputProps={{
                  placeholder: "Ej: Votación familiar, Reunión trabajo...",
                }}
                label="📝 Nombre de la sala"
                errorMessage={errors.name?.message}
              />

              <InputTextApp
                inputControl={{
                  control,
                  name: "description",
                  rules: {
                    maxLength: {
                      value: 256,
                      message: "Máximo 256 caracteres",
                    },
                  },
                }}
                maxLength={256}
                textInputProps={{
                  placeholder: "Describe brevemente el propósito de la sala...",
                }}
                type="multiline"
                label="📄 Descripción (opcional)"
                errorMessage={errors.description?.message}
              />
            </View>

            <View style={styles.buttonContainer}>
              <ButtonApp
                label="✨ Continuar"
                onPress={handleSubmit(onSubmit)}
              />
              <ThemedText style={styles.hint}>
                💡 Podrás modificar estos datos más tarde
              </ThemedText>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40, // Espacio extra al final
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  iconContainer: {
    backgroundColor: "#f0f9ff",
    borderRadius: 50,
    padding: 20,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    gap: 20,
    minHeight: 200,
  },
  buttonContainer: {
    paddingTop: 24,
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
  hint: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
  },
});
