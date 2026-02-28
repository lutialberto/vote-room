import { ButtonApp } from "@/components/ButtonApp";
import InputDateApp from "@/components/inputDate/InputDateApp";
import InputTextApp from "@/components/InputTextApp";
import { useEffect } from "react";
import { AwardBaseData, useNewAwardSteps } from "../hooks/useNewAwardSteps";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export default function AwardBaseDataForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AwardBaseData>({
    defaultValues: {
      name: "",
      description: "",
      tags: [],
      votingStage: {
        startDate: undefined,
        endDate: undefined,
      },
      releaseDate: undefined,
      awardDate: undefined,
    },
  });
  const { resetAwardData, saveBaseData } = useNewAwardSteps();

  useEffect(() => {
    resetAwardData();
  }, [resetAwardData]);

  const onSubmit = (data: AwardBaseData) => {
    saveBaseData(data);
    router.push("/new/newAward/triadCreation");
  };

  return (
    <>
      <InputTextApp
        label="Nombre"
        inputControl={{
          name: "name",
          control,
          rules: { required: "El campo es requerido" },
        }}
        errorMessage={errors.name?.message}
      />
      <InputTextApp
        label="Descripción"
        inputControl={{
          name: "description",
          control,
          rules: { required: "El campo es requerido" },
        }}
        errorMessage={errors.description?.message}
        type="multiline"
      />
      <InputTextApp
        label="Agregar etiqueta"
        inputControl={{
          control,
          name: "tags",
        }}
        errorMessage={errors.tags?.message}
      />
      <InputDateApp
        label="Fecha de inicio de votación"
        formControl={{
          control,
          name: "votingStage.startDate",
          rules: {
            required: "El campo es requerido",
          },
        }}
        error={errors.votingStage?.startDate?.message}
      />
      <InputDateApp
        label="Fecha de fin de votación"
        formControl={{
          control,
          name: "votingStage.endDate",
          rules: {
            required: "El campo es requerido",
          },
        }}
        error={errors.votingStage?.endDate?.message}
      />
      <InputDateApp
        label="Fecha de publicación"
        formControl={{
          control,
          name: "releaseDate",
          rules: {
            required: "El campo es requerido",
          },
        }}
        error={errors.releaseDate?.message}
      />
      <InputDateApp
        label="Fecha de premiación"
        formControl={{
          control,
          name: "awardDate",
          rules: {
            required: "El campo es requerido",
          },
        }}
        error={errors.awardDate?.message}
      />
      <ButtonApp label="Crear premio" onPress={handleSubmit(onSubmit)} />
    </>
  );
}
