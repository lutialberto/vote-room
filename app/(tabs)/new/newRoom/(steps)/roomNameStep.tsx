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
import FormStepCard from "@/components/FormStepCard";
import { NewStepMainIcon } from "@/modules/rooms/newSteps/components/NewStepMainIcon";
import { RoomNameData } from "@/models/Room";
import { useNewRoomData } from "@/modules/rooms/newSteps/hooks/useNewRoomData";
import { useEffect } from "react";

export default function RoomNameStep() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RoomNameData>({
    defaultValues: {
      label: "",
      description: "",
    },
  });
  const { saveRoomNameData, resetRoomData } = useNewRoomData();

  useEffect(() => {
    resetRoomData();
  }, []);

  const onSubmit = (data: RoomNameData) => {
    saveRoomNameData(data);
    router.navigate("/(tabs)/new/newRoom/(steps)/roomTypeStep");
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
              <NewStepMainIcon name="people" />
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
                  name: "label",
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
                errorMessage={errors.label?.message}
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
