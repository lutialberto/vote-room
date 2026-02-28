import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import InviteUserTypeSelector from "@/modules/explore/invitations/components/inviteUser/InviteUserTypeSelector";
import InviteUserForm from "@/modules/explore/invitations/components/inviteUser/InviteUserForm";
import InviteUserPendingList from "@/modules/explore/invitations/components/inviteUser/InviteUserPendingList";
import { PendingInvitation } from "@/modules/explore/invitations/models/PendingInvitation";
import { UserInvitationType } from "@/modules/explore/invitations/models/UserInvitationType";
import { UserInvitation } from "@/modules/explore/invitations/models/UserInvitation";
import { PendingInvitationRequest } from "../../models/PendingInvitationRequest";

export interface InviteUsersViewProps {
  entityId: string;
  entityType: PendingInvitationRequest["entityType"];
}

export default function InviteUsersView({
  entityId,
  entityType,
}: InviteUsersViewProps) {
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
            Selecciona cómo quieres invitar usuarios
          </ThemedText>
        </View>

        <InviteUserTypeSelector
          selectedInvitationType={selectedType}
          handleSelectedOption={onInvitationTypeChange}
        />

        <InviteUserForm handleSubmitForm={onSubmit} />
        <InviteUserPendingList
          pendingInvitations={pendingInvitations}
          removeInvitation={removeInvitation}
          entityId={entityId}
          entityType={entityType}
        />
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: "center",
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
