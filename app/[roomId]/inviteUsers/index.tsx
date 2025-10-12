import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InviteUserTypeSelector from "@/modules/rooms/inviteUsers/components/InviteUserTypeSelector";
import InviteUserForm from "@/modules/rooms/inviteUsers/components/InviteUserForm";
import InviteUserPendingList from "@/modules/rooms/inviteUsers/components/InviteUserPendingList";
import { PendingInvitation } from "@/modules/rooms/inviteUsers/models/PendingInvitation";
import { UserInvitationType } from "@/modules/rooms/inviteUsers/models/UserInvitationType";
import { UserInvitation } from "@/modules/rooms/inviteUsers/models/UserInvitation";

export default function InviteUsers() {
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitation[]
  >([]);
  const [selectedType, setSelectedType] =
    useState<UserInvitationType>("userId");

  const onSubmit = (data: UserInvitation) => {
    if (data.value) {
      const newInvitation: PendingInvitation = {
        id: Date.now().toString(),
        type: selectedType,
        value: data.value,
        timestamp: new Date(),
      };
      setPendingInvitations((prev) => [...prev, newInvitation]);
    }
  };

  const onInvitationTypeChange = (type: UserInvitationType) => {
    setSelectedType(type);
  };

  const removeInvitation = (id: string) => {
    setPendingInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "flex-end" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Invitar usuarios
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Selecciona cómo quieres invitar usuarios a tu sala
            </ThemedText>
          </View>

          <InviteUserTypeSelector
            selectedInvitationType={selectedType}
            handleSelectedOption={onInvitationTypeChange}
          />

          <InviteUserPendingList
            pendingInvitations={pendingInvitations}
            removeInvitation={removeInvitation}
          />
          <InviteUserForm handleSubmitForm={onSubmit} />
        </KeyboardAvoidingView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
});
