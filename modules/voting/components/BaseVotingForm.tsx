import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import InputTextApp from "@/components/InputTextApp";
import { useForm } from "react-hook-form";
import InputDateApp from "@/components/inputDate/InputDateApp";
import { RadioButtonApp } from "@/components/RadioButtonApp";
import {
  BASE_VOTING_TYPE_OPTIONS,
  CLOSE_TYPE_OPTIONS,
  RELEASE_TYPE_OPTIONS,
} from "@/modules/voting/new/constants/FormOptions";
import { useEffect } from "react";
import { ButtonApp } from "@/components/ButtonApp";
import {
  BaseVoting,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import { useBaseVoting } from "../hooks/useBaseVoting";

interface BaseVotingFormProps {
  isReadOnly?: boolean;
  voting: BaseVoting | null;
  onSubmit: (data: BaseVotingForCreation) => void;
  isEditMode?: boolean;
}

export default function BaseVotingForm({
  isReadOnly = false,
  voting,
  onSubmit,
  isEditMode = false,
}: BaseVotingFormProps) {
  const { saveBaseVotingData, resetBaseVotingData } = useBaseVoting();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BaseVotingForCreation>({
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
  const type = watch("type");
  const selectedTypeOption = BASE_VOTING_TYPE_OPTIONS.find(
    (option) => option.value === type
  );

  const closeType = watch("close.type");
  const selectedCloseOption = CLOSE_TYPE_OPTIONS.find(
    (option) => option.value === closeType
  );

  const releaseType = watch("release.type");
  const selectedReleaseOption = RELEASE_TYPE_OPTIONS.find(
    (option) => option.value === releaseType
  );

  useEffect(() => {
    if (voting) {
      resetBaseVotingData();
      reset(voting);
    }
  }, [voting]);

  const onSubmitData = (data: BaseVotingForCreation) => {
    saveBaseVotingData(data);
    onSubmit(data);
  };

  return (
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
              editable: !isReadOnly,
            }}
            errorMessage={errors.question?.message}
          />

          <InputTextApp
            label={`Descripción${isReadOnly ? "" : " - opcional"}`}
            inputControl={{
              control,
              name: "description",
            }}
            type="multiline"
            maxLength={256}
            textInputProps={{
              multiline: true,
              numberOfLines: 5,
              editable: !isReadOnly,
            }}
            errorMessage={errors.description?.message}
          />

          <View>
            <ThemedText type="inputLabel">Tipo de votación</ThemedText>
            {!isReadOnly ? (
              <RadioButtonApp
                options={BASE_VOTING_TYPE_OPTIONS.map((option) => ({
                  label: option.label,
                  selected: option.value === type,
                  value: option.value,
                }))}
                enabled={!isEditMode}
                onPress={(value) =>
                  setValue("type", value as BaseVotingForCreation["type"])
                }
              />
            ) : (
              <ThemedText type="default">
                {selectedTypeOption?.label || type}
              </ThemedText>
            )}
            {selectedTypeOption?.description && (
              <ThemedText type="hint">
                {selectedTypeOption.description}
              </ThemedText>
            )}
          </View>

          <View>
            <ThemedText type="inputLabel">Configuración de cierre</ThemedText>
            {!isReadOnly ? (
              <RadioButtonApp
                options={CLOSE_TYPE_OPTIONS.map((option) => ({
                  label: option.label,
                  selected: option.value === closeType,
                  value: option.value,
                }))}
                onPress={(value) =>
                  setValue(
                    "close.type",
                    value as BaseVotingForCreation["close"]["type"]
                  )
                }
              />
            ) : (
              <ThemedText type="default">
                {selectedCloseOption?.label || closeType}
              </ThemedText>
            )}
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
                        message: "La duración no puede exceder los 60 minutos",
                      },
                      required: "La duración es requerida",
                    },
                  }}
                  textInputProps={{
                    keyboardType: "numeric",
                    editable: !isReadOnly,
                  }}
                  errorMessage={errors.close?.durationMinutes?.message}
                />
                <ThemedText type="hint">
                  De 0.2 (20 segundos) a 60 minutos
                </ThemedText>
              </>
            )}
          </View>

          <View>
            <ThemedText type="inputLabel">
              Configuración de publicación
            </ThemedText>
            {!isReadOnly ? (
              <RadioButtonApp
                options={RELEASE_TYPE_OPTIONS.map((option) => ({
                  label: option.label,
                  selected: option.value === releaseType,
                  value: option.value,
                }))}
                onPress={(value) =>
                  setValue(
                    "release.type",
                    value as BaseVotingForCreation["release"]["type"]
                  )
                }
              />
            ) : (
              <ThemedText type="default">
                {selectedReleaseOption?.label || releaseType}
              </ThemedText>
            )}
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
                      disabled: isReadOnly,
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
                      disabled: isReadOnly,
                    },
                    formatDate: (date) => date?.toLocaleTimeString() ?? "",
                  }}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
      {!isReadOnly && (
        <ButtonApp
          label="Guardar cambios"
          onPress={handleSubmit(onSubmitData)}
        />
      )}
    </KeyboardAvoidingView>
  );
}
