import { useForm } from "react-hook-form";
import { TriadItemData } from "../hooks/useNewAwardSteps";
import InputTextApp from "@/components/InputTextApp";
import { ButtonApp } from "@/components/ButtonApp";
import { CardApp } from "@/components/CardApp";

export interface AwardTriadFormProps {
  onSubmit: (data: TriadItemData) => void;
}

export default function AwardTriadForm({ onSubmit }: AwardTriadFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TriadItemData>({
    defaultValues: {
      name: "",
      nominees: [],
    },
  });
  return (
    <CardApp style={{ gap: 10 }}>
      <InputTextApp
        label="Nombre de la terna"
        inputControl={{
          control,
          name: "name",
        }}
        errorMessage={errors.name?.message}
      />
      <InputTextApp
        label="Candidatos"
        inputControl={{
          control,
          name: "nominees",
          rules: {
            required: "Los candidatos son requeridos",
          },
        }}
        maxMultivalue={3}
        errorMessage={errors.nominees?.message}
      />
      <ButtonApp
        label="Guardar terna"
        onPress={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      />
    </CardApp>
  );
}
