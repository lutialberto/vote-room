import { ButtonApp } from "@/components/ButtonApp";
import InputTextApp from "@/components/InputTextApp";
import { ThemedText } from "@/components/ThemedText";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function SearchRoomByCodeFormKey({
  onSubmit,
  errorMessage,
}: {
  onSubmit: (key: string) => void;
  errorMessage?: string;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ key: string }>();

  return (
    <View style={{ gap: 12, flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        <InputTextApp
          label="Clave"
          inputControl={{
            control,
            name: "key",
            defaultValue: "",
            rules: { required: "La clave de la sala es obligatoria" },
          }}
          textInputProps={{
            style: {
              textTransform: "uppercase",
            },
          }}
        />
        {errors.key && (
          <ThemedText type="inputError">{errors.key.message}</ThemedText>
        )}
        {errorMessage && (
          <ThemedText type="inputError">{errorMessage}</ThemedText>
        )}
      </View>
      <ButtonApp
        label="Enviar"
        onPress={handleSubmit((data) => onSubmit(data.key))}
        style={{
          height: 40,
        }}
      />
    </View>
  );
}
