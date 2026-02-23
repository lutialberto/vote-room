import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { ButtonApp } from "@/components/ButtonApp";
import FormStepCard from "@/components/FormStepCard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconApp } from "@/components/IconApp";
import { NewStepMainIcon } from "@/modules/rooms/newSteps/components/NewStepMainIcon";
import { CardApp } from "@/components/CardApp";
import { ColorScheme } from "@/constants/Colors";
import { useNewRoomData } from "@/modules/rooms/newSteps/hooks/useNewRoomData";

type FormData = {
  tags: string[];
  type: string;
  event: boolean;
};

export default function RoomTypeStep() {
  const colors = useThemeColor();
  const styles = getStyles(colors);
  const { saveRoomTypeData } = useNewRoomData();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tags: [],
      type: "",
      event: false,
    },
  });
  const isEvent = watch("event");

  const onSubmit = (data: FormData) => {
    saveRoomTypeData(data);
    router.navigate("./roomScopeStep");
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
              <NewStepMainIcon name="pricetags" />
              <ThemedText type="title" style={styles.title}>
                🏷️ Configura tu Sala
              </ThemedText>
              <ThemedText type="subtitle" style={styles.subtitle}>
                Ayuda a otros usuarios a encontrar tu sala con tags y categorías
              </ThemedText>
            </View>

            <FormStepCard
              stepNumber={2}
              instructions="Define el tipo de sala y etiquetas para facilitar su búsqueda"
            />

            <View style={styles.formContainer}>
              <View style={styles.section}>
                <ThemedText type="title">🏷️ Etiquetas (Tags)</ThemedText>
                <ThemedText type="subtitle">
                  Agrega palabras clave que describan tu sala
                </ThemedText>

                <InputTextApp
                  inputControl={{
                    control,
                    name: "tags",
                  }}
                  textInputProps={{
                    placeholder: "Ej: familia, decisiones, comida...",
                    returnKeyType: "done",
                  }}
                  label="Agregar etiqueta"
                  errorMessage={errors.tags?.message}
                />
              </View>

              <View style={styles.section}>
                <ThemedText type="title">📂 Categoría</ThemedText>
                <ThemedText type="subtitle">
                  Selecciona el tipo de votación que realizarás
                </ThemedText>
                <InputTextApp
                  inputControl={{
                    control,
                    name: "type",
                    rules: {
                      required: "La categoría es requerida",
                    },
                  }}
                  textInputProps={{
                    placeholder: "Ej: Entretenimiento, Trabajo, Personal...",
                  }}
                  label="Tipo de sala"
                  errorMessage={errors.type?.message}
                />
              </View>

              <View style={styles.section}>
                <ThemedText type="title">📅 Configuración especial</ThemedText>
                <CardApp style={styles.switchContainer}>
                  <View style={styles.switchInfo}>
                    <ThemedText style={styles.switchLabel}>
                      Evento especial
                    </ThemedText>
                    <ThemedText style={styles.switchDescription}>
                      Marca si es para un evento con fecha específica
                    </ThemedText>
                  </View>
                  <Controller
                    control={control}
                    name="event"
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        value={value}
                        onValueChange={onChange}
                        trackColor={{
                          false: colors.border,
                          true: colors.primary,
                        }}
                        thumbColor={"white"}
                      />
                    )}
                  />
                </CardApp>
                {isEvent && (
                  <View style={styles.eventInfo}>
                    <IconApp
                      name="information-circle"
                      size={16}
                      colorName="primary"
                    />
                    <ThemedText colorName="primary" style={styles.eventText}>
                      Los eventos aparecerán destacados en las búsquedas
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonApp
                label="🚀 Continuar"
                onPress={handleSubmit(onSubmit)}
              />
              <ThemedText type="hint" style={styles.hint}>
                💡 Paso 2 de 3 completado
              </ThemedText>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    keyboardContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
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
      textAlign: "center",
    },
    formContainer: {
      gap: 24,
      marginBottom: 24,
    },
    section: {
      gap: 12,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    switchInfo: {
      flex: 1,
      marginRight: 16,
    },
    switchLabel: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
    },
    switchDescription: {
      fontSize: 14,
      opacity: 0.7,
    },
    eventInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
      backgroundColor: colors.primary + "20",
    },
    eventText: {
      fontSize: 14,
      flex: 1,
    },
    buttonContainer: {
      alignItems: "center",
      gap: 10,
    },
    hint: {
      textAlign: "center",
    },
  });
