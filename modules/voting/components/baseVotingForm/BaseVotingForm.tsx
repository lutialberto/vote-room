import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import InputTextApp from "@/components/InputTextApp";
import { useForm } from "react-hook-form";
import { RadioButtonApp } from "@/components/RadioButtonApp";
import { BASE_VOTING_TYPE_OPTIONS } from "@/modules/voting/new/constants/FormOptions";
import { useEffect } from "react";
import { ButtonApp } from "@/components/ButtonApp";
import {
  BaseVoting,
  BaseVotingAdvancedForCreation,
  BaseVotingForCreation,
} from "@/modules/voting/models/Voting";
import { useBaseVoting } from "../../hooks/useBaseVoting";
import BaseVotingAdvancedForm from "./BaseVotingAdvancedForm";
import InputSelectApp from "@/components/InputSelectApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { Room } from "@/models/Room";
import { fetchRoomsByOwner } from "@/services/room/roomService";

interface BaseVotingFormProps {
  isReadOnly?: boolean;
  voting: BaseVoting | null;
  onSubmit: (props: {
    data: BaseVotingForCreation;
    advancedData: BaseVotingAdvancedForCreation;
  }) => void;
  isEditMode?: boolean;
}

export default function BaseVotingForm({
  isReadOnly = false,
  voting,
  onSubmit,
  isEditMode = false,
}: BaseVotingFormProps) {
  const { currentUser } = useAuthenticatedUser();
  const { advancedData, saveBaseVotingData, resetBaseVotingData } =
    useBaseVoting();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm<BaseVotingForCreation>({
    defaultValues: {
      question: "",
      description: "",
    },
  });

  const {
    data: rooms,
    error,
    isLoading,
    refetch,
  } = useListFetcherApp<Room>(
    () => fetchRoomsByOwner(currentUser.id),
    [currentUser.id]
  );

  useEffect(() => {
    if (voting && rooms) {
      const roomCode = rooms.find((room) => room.code === voting.roomCode) ?? {
        code: undefined,
        description: "",
      };
      resetBaseVotingData();
      reset({
        ...voting,
        roomCode: {
          label: roomCode.code
            ? `${roomCode.code} - ${roomCode.description}`
            : "",
          value: roomCode.code,
        },
      });
    }
  }, [voting, rooms]);

  const type = watch("type");
  const selectedTypeOption = BASE_VOTING_TYPE_OPTIONS.find(
    (option) => option.value === type
  );

  const onSubmitData = (data: BaseVotingForCreation) => {
    if (!data.type) {
      setError("type", {
        message: "El campo es requerido",
      });
      return;
    }
    saveBaseVotingData(data);
    onSubmit({ data, advancedData: advancedData! });
  };

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
              <>
                <RadioButtonApp
                  options={BASE_VOTING_TYPE_OPTIONS.map((option) => ({
                    label: option.label,
                    selected: option.value === type,
                    value: option.value,
                  }))}
                  enabled={!isEditMode}
                  onPress={(value) => {
                    setValue("type", value as BaseVotingForCreation["type"]);
                    clearErrors("type");
                  }}
                />
                {errors.type?.message && (
                  <ThemedText type="inputError">
                    {errors.type.message}
                  </ThemedText>
                )}
              </>
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

          <InputSelectApp
            label="Asociar a sala"
            formControl={{
              control,
              name: "roomCode",
            }}
            options={rooms.map((room) => ({
              label: `${room.code} - ${room.description}`,
              value: room.code,
            }))}
            enabled={!isReadOnly}
            error={errors.roomCode?.message}
          />

          <BaseVotingAdvancedForm isReadOnly={isReadOnly} />
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
