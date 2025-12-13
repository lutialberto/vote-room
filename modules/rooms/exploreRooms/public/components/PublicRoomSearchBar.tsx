import { View, StyleSheet } from "react-native";
import InputTextApp from "@/components/InputTextApp";
import { useForm } from "react-hook-form";
import { ButtonApp } from "@/components/ButtonApp";

export interface PublicRoomSearchBarProps {
  onSearch: (name: string) => void;
}

export default function PublicRoomSearchBar({
  onSearch,
}: PublicRoomSearchBarProps) {
  const { handleSubmit, control } = useForm<{ label: string }>();

  return (
    <View style={styles.container}>
      <InputTextApp
        inputControl={{
          control,
          name: "label",
          defaultValue: "",
        }}
        textInputProps={{
          placeholder: "Buscar...",
        }}
        containerStyle={{
          flex: 1,
        }}
      />

      <ButtonApp
        onPress={handleSubmit((data) => onSearch(data.label))}
        icon="search"
        style={styles.search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  search: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 0,
  },
});
