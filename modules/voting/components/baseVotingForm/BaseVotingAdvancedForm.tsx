import { RadioButtonApp } from "@/components/RadioButtonApp";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  BASE_VOTING_TYPE_OPTIONS,
  CLOSE_TYPE_OPTIONS,
  RELEASE_TYPE_OPTIONS,
} from "../../new/constants/FormOptions";
import {
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
} from "../../models/Voting";
import InputDateApp from "@/components/inputDate/InputDateApp";
import InputTextApp from "@/components/InputTextApp";
import NewScopeStep from "@/modules/new/components/newScopeStep/NewScopeStep";
import { useForm } from "react-hook-form";
import { ButtonApp } from "@/components/ButtonApp";
import { useBaseVoting } from "../../hooks/useBaseVoting";
import { useNewScopeStep } from "@/modules/new/components/newScopeStep/useNewScopeStep";
import InputOptionsAdvanceApp from "@/components/InputOptionsAdvanceApp";
import { IconApp } from "@/components/IconApp";
import { useThemeColor } from "@/hooks/useThemeColor";
import FormStepCard from "@/components/FormStepCard";

export interface BaseVotingAdvancedFormProps {
  isReadOnly: boolean;
}

export default function BaseVotingAdvancedForm({
  isReadOnly,
}: BaseVotingAdvancedFormProps) {
  const [showAdvancedConfig, setShowAdvancedConfig] = useState(false);
  const colors = useThemeColor();
  const { saveBaseVotingAdvancedData } = useBaseVoting();
  const { isPrivate, membersType } = useNewScopeStep();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BaseVotingAdvancedForCreation>({
    defaultValues: {
      close: {
        type: "manualClose",
        durationMinutes: undefined,
      },
      release: {
        type: "releaseOnCreate",
        date: new Date(),
      },
      scope: {
        isPrivate,
        membersType,
      },
    },
  });

  const closeType = watch("close.type");
  const releaseType = watch("release.type");

  const handleCloseModal = () => {
    const advanceData = {
      close: watch("close"),
      release: watch("release"),
      scope: watch("scope"),
    };
    saveBaseVotingAdvancedData(advanceData);
    setShowAdvancedConfig(false);
  };

  return (
    <>
      <ButtonApp
        label="Opciones avanzadas"
        type="outline"
        onPress={() => setShowAdvancedConfig(true)}
      />
      <Modal
        visible={showAdvancedConfig}
        onRequestClose={handleSubmit(handleCloseModal)}
        animationType="slide"
        onDismiss={handleSubmit(handleCloseModal)}
        presentationStyle="pageSheet"
        style={{ backgroundColor: "blue" }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 10,
            marginVertical: 10,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row" }}>
            <ThemedText type="title">Configuración avanzada</ThemedText>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
              onPress={handleSubmit(handleCloseModal)}
            >
              <IconApp
                name="close"
                size={20}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 50,
                  padding: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          <NewScopeStep stepNumber={1} />

          <FormStepCard
            stepNumber={2}
            instructions="Configura el inicio y cierre de tu votación"
          />
          <InputOptionsAdvanceApp
            label="🎗️ Configuración de publicación"
            options={RELEASE_TYPE_OPTIONS.map((option) => ({
              ...option,
              onPress: () =>
                setValue(
                  "release.type",
                  option.code as BaseVotingAdvancedForCreation["release"]["type"]
                ),
            }))}
          />
          <View>
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

          <InputOptionsAdvanceApp
            label="🔒 Configuración de cierre"
            options={CLOSE_TYPE_OPTIONS.map((option) => ({
              ...option,
              onPress: () =>
                setValue(
                  "close.type",
                  option.code as BaseVotingAdvancedForCreation["close"]["type"]
                ),
            }))}
          />
          <View>
            {closeType === "programmedClose" && (
              <>
                <InputTextApp
                  label="Duración (minutos)"
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
        </ScrollView>
      </Modal>
    </>
  );
}
