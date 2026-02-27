import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ButtonApp } from "@/components/ButtonApp";
import { PublicRoomTypeFilter } from "@/models/Room";
import { IconApp } from "@/components/IconApp";
import { useForm } from "react-hook-form";
import InputTextApp from "@/components/InputTextApp";
import { PublicVotingTypeFilter } from "@/modules/voting/models/Voting";

export interface PublicVotingFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filter: PublicVotingTypeFilter) => void;
}

export default function PublicVotingFilterModal({
  visible,
  onClose,
  onApply,
}: PublicVotingFilterModalProps) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PublicVotingTypeFilter>({
    defaultValues: {
      question: "",
      roomCode: "",
      ownerName: "",
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
            label="Pregunta"
            inputControl={{
              control,
              name: "question",
            }}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={errors.question?.message}
          />
          <InputTextApp
            label="Código de Sala"
            inputControl={{
              control,
              name: "roomCode",
            }}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={errors.roomCode?.message}
          />
          <InputTextApp
            label="Propietario"
            inputControl={{
              control,
              name: "ownerName",
            }}
            containerStyle={{ marginBottom: 16 }}
            errorMessage={errors.ownerName?.message}
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
