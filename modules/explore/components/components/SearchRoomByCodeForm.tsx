import { ButtonApp } from "@/components/ButtonApp";
import InputTextApp from "@/components/InputTextApp";
import { ThemedText } from "@/components/ThemedText";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function SearchRoomByCodeForm({
  isSearching,
  onSearch,
}: {
  isSearching: boolean;
  onSearch: (code: string) => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ code: string }>();

  return (
    <View style={{ gap: 12, flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        <InputTextApp
          label="Código"
          inputControl={{
            control,
            name: "code",
            defaultValue: "",
            rules: { required: "El código de la sala es obligatorio" },
          }}
          textInputProps={{
            style: {
              textTransform: "uppercase",
            },
          }}
        />
        {errors.code && (
          <ThemedText type="inputError">{errors.code.message}</ThemedText>
        )}
      </View>
      <ButtonApp
        label="Buscar"
        onPress={handleSubmit((data) => onSearch(data.code))}
        disabled={isSearching}
        style={{
          height: 40,
        }}
      />
    </View>
  );
}
