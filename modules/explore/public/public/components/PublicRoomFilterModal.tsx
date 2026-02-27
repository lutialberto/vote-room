import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { PublicRoomTypeFilter } from "@/models/Room";
import { IconApp } from "@/components/IconApp";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";

export interface PublicRoomFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filter: PublicRoomTypeFilter) => void;
}

export default function PublicRoomFilterModal({
  visible,
  onClose,
  onApply,
}: PublicRoomFilterModalProps) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PublicRoomTypeFilter>({
    defaultValues: {
      code: "",
      label: "",
      ownerName: "",
      tags: [],
    },
  });
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Filtros Avanzados</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconApp name="close" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <InputTextApp
            label="Nombre"
            inputControl={{
              control,
              name: "label",
            }}
            textInputProps={{
              placeholder: "Ingrese el nombre...",
            }}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={errors.label?.message}
          />
          <InputTextApp
            label="Código"
            inputControl={{
              control,
              name: "code",
            }}
            textInputProps={{
              placeholder: "Ingrese el código...",
            }}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={errors.code?.message}
          />
          <InputTextApp
            label="Propietario"
            inputControl={{
              control,
              name: "ownerName",
            }}
            textInputProps={{
              placeholder: "Ingrese el nombre del propietario...",
            }}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={errors.ownerName?.message}
          />
          <InputTextApp
            label="Tags"
            inputControl={{
              control,
              name: "tags",
            }}
            textInputProps={{
              placeholder: "Ingrese los tags...",
            }}
            maxMultivalue={3}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={errors.tags?.message}
          />
        </View>

        <View style={styles.footer}>
          <ButtonApp
            label="Limpiar"
            type="secondary"
            style={styles.button}
            onPress={() => reset()}
          />
          <ButtonApp
            label="Aplicar"
            type="primary"
            style={styles.button}
            onPress={handleSubmit(onApply)}
          />
        </View>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  button: {
    flex: 1,
  },
});
