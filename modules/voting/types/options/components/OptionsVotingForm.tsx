import { useForm } from "react-hook-form";
import {
  OptionsVotingChoice,
  OptionsVotingForCreation,
} from "../models/OptionsVoting";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { ButtonApp } from "@/components/ButtonApp";
import InputTextApp from "@/components/InputTextApp";
import { ThemedText } from "@/components/ThemedText";

interface OptionsVotingFormProps {
  isReadOnly?: boolean;
  choices: string[] | null;
  onSubmit: (data: OptionsVotingForCreation) => void;
}

export default function OptionsVotingForm({
  isReadOnly,
  choices,
  onSubmit,
}: OptionsVotingFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<OptionsVotingForCreation>({
    defaultValues: {
      options: [],
    },
  });

  useEffect(() => {
    if (choices && choices.length > 0) {
      reset({
        options: choices,
      });
    }
  }, [choices]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
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
          {isReadOnly ? (
            <View style={{ gap: 8 }}>
              {choices?.map((choice, index) => (
                <ThemedText
                  key={index}
                  style={{
                    padding: 8,
                    borderWidth: 1,
                    borderRadius: 4,
                  }}
                >
                  {choice}
                </ThemedText>
              ))}
            </View>
          ) : (
            <InputTextApp
              maxMultivalue={4}
              label="Opciones"
              inputControl={{
                control,
                name: "options",
                rules: {
                  required: "El campo es obligatorio",
                },
              }}
              maxLength={50}
              textInputProps={{
                editable: !isReadOnly,
                placeholder: "Ingrese una opción...",
              }}
              errorMessage={errors.options?.message}
            />
          )}
        </View>
      </ScrollView>
      {!isReadOnly && (
        <ButtonApp label="Guardar cambios" onPress={handleSubmit(onSubmit)} />
      )}
    </KeyboardAvoidingView>
  );
}
