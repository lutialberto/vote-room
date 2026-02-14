import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonApp } from "@/components/ButtonApp";
import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import InviteUserTypeSelector from "@/modules/rooms/inviteUsers/components/InviteUserTypeSelector";
import InviteUserForm from "@/modules/rooms/inviteUsers/components/InviteUserForm";
import InviteUserPendingList from "@/modules/rooms/inviteUsers/components/InviteUserPendingList";
import { PendingInvitation } from "@/modules/rooms/inviteUsers/models/PendingInvitation";
import { UserInvitationType } from "@/modules/rooms/inviteUsers/models/UserInvitationType";
import { UserInvitation } from "@/modules/rooms/inviteUsers/models/UserInvitation";

export default function InviteUsers() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
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
            Selecciona cómo quieres invitar usuarios a tu sala
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
          roomId={roomId}
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
