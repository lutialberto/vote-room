import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import InviteUserTypeSelector from "@/modules/explore/invitations/components/inviteUser/InviteUserTypeSelector";
import InviteUserForm from "@/modules/explore/invitations/components/inviteUser/InviteUserForm";
import InviteUserPendingList from "@/modules/explore/invitations/components/inviteUser/InviteUserPendingList";
import { PendingInvitation } from "@/modules/explore/invitations/models/PendingInvitation";
import { UserInvitationType } from "@/modules/explore/invitations/models/UserInvitationType";
import { UserInvitation } from "@/modules/explore/invitations/models/UserInvitation";
import {
  PendingInvitationRequest,
  PendingInvitationRequestDetail,
} from "../../models/PendingInvitationRequest";
import {
  createPendingInvitationRequest,
  fetchPendingInvitationRequestDetailsByEntityId,
} from "../../services/pendingInvitationRequestService";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { SpinnerApp } from "@/components/SpinnerApp";
import { useListFetcherApp } from "@/hooks/useListFetcherApp";

export interface InviteUsersViewProps {
  entityId: string;
  entityType: PendingInvitationRequest["entityType"];
}

export default function InviteUsersView({
  entityId,
  entityType,
}: InviteUsersViewProps) {
  const {
    data: pendingInvitations,
    error,
    isLoading,
    refetch,
  } = useListFetcherApp<PendingInvitationRequestDetail>(
    () => fetchPendingInvitationRequestDetailsByEntityId(entityId),
    [entityId]
  );
  const [selectedType, setSelectedType] =
    useState<UserInvitationType>("userId");

  const { execPromise: fnCreatePendingInvitation, isWaiting } = useWaitingApp<
    {
      invitation: PendingInvitation;
      entityId: string;
    },
    boolean
  >({
    functionToWait: (data) =>
      createPendingInvitationRequest(
        data.invitation,
        data.entityId,
        entityType
      ),
    success: () => refetch(),
    failure: (err) => {
      Alert.alert(
        "Error",
        "No se pudieron enviar las invitaciones: " + err.message
      );
    },
  });

  const onSubmit = (data: UserInvitation) => {
    if (data.value) {
      const newInvitation: PendingInvitation = {
        id: Date.now().toString(),
        type: selectedType,
        value: data.value,
        timestamp: new Date(),
      };
      fnCreatePendingInvitation({ invitation: newInvitation, entityId });
    }
  };

  const onInvitationTypeChange = (type: UserInvitationType) => {
    setSelectedType(type);
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

        <SpinnerApp visible={isWaiting}>
          <InviteUserForm handleSubmitForm={onSubmit} />
        </SpinnerApp>

        <SpinnerApp visible={isLoading}>
          <InviteUserPendingList
            pendingInvitations={pendingInvitations}
            entityId={entityId}
            entityType={entityType}
          />
        </SpinnerApp>
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
