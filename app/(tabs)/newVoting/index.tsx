import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import InputTextApp from "@/components/InputTextApp";
import { useForm } from "react-hook-form";
import { useUser } from "@/contexts/UserContext";
import InputDateApp from "@/components/inputDate/InputDateApp";
import { RadioButtonApp } from "@/components/RadioButtonApp";
import QuickBooleanPoll, {
  QuickBooleanPollForCreation,
} from "@/modules/voting/new/models/QuickBooleanPoll";
import {
  CLOSE_TYPE_OPTIONS,
  RELEASE_TYPE_OPTIONS,
} from "@/modules/voting/new/constants/FormOptions";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { createQuickBooleanPoll } from "@/modules/voting/services/votingService";
import { router } from "expo-router";

export default function NewVoting() {
  const { currentUser } = useUser();

  const { isWaiting: isWaitingCreate, execPromise: handleCreate } =
    useWaitingApp<
      {
        userId: number;
        pollData: QuickBooleanPollForCreation;
      },
      QuickBooleanPoll
    >({
      functionToWait: ({ userId, pollData }) =>
        createQuickBooleanPoll({ userId, pollData }),
      success: ({ id }) => {
        reset();
        router.replace(`/voting/${id}`);
      },
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<QuickBooleanPollForCreation>({
    defaultValues: {
      question: "",
      description: "",
      close: {
        type: "manualClose",
        durationMinutes: undefined,
      },
      release: {
        type: "releaseOnCreate",
        date: new Date(),
      },
    },
  });

  const closeType = watch("close.type");
  const selectedCloseOption = CLOSE_TYPE_OPTIONS.find(
    (option) => option.value === closeType
  );

  const releaseType = watch("release.type");
  const selectedReleaseOption = RELEASE_TYPE_OPTIONS.find(
    (option) => option.value === releaseType
  );

  const onCreatePoll = async (data: QuickBooleanPollForCreation) => {
    handleCreate({
      userId: currentUser.id,
      pollData: data,
    });
  };

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", padding: 16, gap: 20 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 20,
            alignItems: "center",
            width: "100%",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <ThemedText type="title">Crear Votación Rápida</ThemedText>
            <ThemedText type="subtitle">
              Crea una votación Sí/No en segundos
            </ThemedText>
          </View>

          <View style={{ width: "100%", gap: 8 }}>
            <InputTextApp
              label="Pregunta"
              inputControl={{
                control,
                name: "question",
                rules: {
                  required: "El campo es obligatorio",
                },
              }}
              type="multiline"
              maxLength={256}
              textInputProps={{
                multiline: true,
                numberOfLines: 3,
              }}
              errorMessage={errors.question?.message}
            />

            <InputTextApp
              label="Descripción - opcional"
              inputControl={{
                control,
                name: "description",
              }}
              type="multiline"
              maxLength={256}
              textInputProps={{
                multiline: true,
                numberOfLines: 5,
              }}
              errorMessage={errors.description?.message}
            />

            <View>
              <ThemedText type="inputLabel">Configuración de cierre</ThemedText>
              <RadioButtonApp
                options={CLOSE_TYPE_OPTIONS.map((option) => ({
                  label: option.label,
                  selected: option.value === closeType,
                  value: option.value,
                }))}
                onPress={(value) =>
                  setValue(
                    "close.type",
                    value as QuickBooleanPollForCreation["close"]["type"]
                  )
                }
              />
              {selectedCloseOption?.description && (
                <ThemedText type="hint">
                  {selectedCloseOption.description}
                </ThemedText>
              )}
              {closeType === "programmedClose" && (
                <>
                  <InputTextApp
                    label="Duración (minutos) - opcional"
                    inputControl={{
                      control,
                      name: "close.durationMinutes",
                      rules: {
                        min: {
                          value: 0.2,
                          message: "La duración debe ser al menos 20 segundos",
                        },
                        max: {
                          value: 60,
                          message:
                            "La duración no puede exceder los 60 minutos",
                        },
                        required: "La duración es requerida",
                      },
                    }}
                    textInputProps={{
                      keyboardType: "numeric",
                    }}
                    errorMessage={errors.close?.durationMinutes?.message}
                  />
                  <ThemedText type="hint">
                    De 0.2 (20 segundos) a 60 minutos
                  </ThemedText>
                </>
              )}
            </View>

            <ThemedText type="inputLabel">
              Configuración de publicación
            </ThemedText>
            <RadioButtonApp
              options={RELEASE_TYPE_OPTIONS.map((option) => ({
                label: option.label,
                selected: option.value === releaseType,
                value: option.value,
              }))}
              onPress={(value) =>
                setValue(
                  "release.type",
                  value as QuickBooleanPollForCreation["release"]["type"]
                )
              }
            />
            {selectedReleaseOption?.description && (
              <ThemedText type="hint">
                {selectedReleaseOption.description}
              </ThemedText>
            )}

            {releaseType === "releaseScheduled" && (
              <>
                <InputDateApp
                  label="Fecha de publicación"
                  formControl={{
                    control,
                    name: "release.date",
                    rules: {
                      required: "La fecha de publicación es requerida",
                      validate: (value) => {
                        if (value && value < new Date()) {
                          return "La fecha de publicación no puede ser en el pasado";
                        }
                      },
                    },
                  }}
                  dateInput={{
                    datePickerConfig: {
                      mode: "date",
                      value: new Date(),
                    },
                    formatDate: (date) => date?.toLocaleDateString() ?? "",
                  }}
                />
                <InputDateApp
                  label="Hora de publicación"
                  formControl={{
                    control,
                    name: "release.date",
                    rules: {
                      required: "La hora de publicación es requerida",
                      validate: (value) => {
                        if (value && value < new Date()) {
                          return "La hora de publicación no puede ser en el pasado";
                        }
                      },
                    },
                  }}
                  dateInput={{
                    datePickerConfig: {
                      mode: "time",
                      value: new Date(),
                    },
                    formatDate: (date) => date?.toLocaleTimeString() ?? "",
                  }}
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ButtonApp
        label={"Crear Votación"}
        onPress={handleSubmit(onCreatePoll)}
        disabled={isWaitingCreate}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
