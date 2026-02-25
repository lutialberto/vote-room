import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { ButtonApp } from "@/components/ButtonApp";
import { OptionsButtonApp } from "@/components/OptionsButtonApp";
import { router } from "expo-router";
import FormStepCard from "@/components/FormStepCard";
import { IconApp, IconName } from "@/components/IconApp";
import { NewStepMainIcon } from "@/modules/rooms/newSteps/components/NewStepMainIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CardApp } from "@/components/CardApp";
import { ColorScheme } from "@/constants/Colors";
import { useNewRoomData } from "@/modules/rooms/newSteps/hooks/useNewRoomData";
import { BaseRoom, CreateRoomData, MembersType } from "@/models/Room";
import { useWaitingApp } from "@/hooks/useWaitingApp";
import { createRoom } from "@/services/room/roomService";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { SpinnerApp } from "@/components/SpinnerApp";

const membersTypes: {
  code: MembersType;
  label: string;
  description: string;
  icon: IconName;
}[] = [
  {
    code: "unrestricted",
    label: "Irrestricto",
    description: "Cualquier usuario puede acceder",
    icon: "globe-outline",
  },
  {
    code: "authenticated",
    label: "Autenticado",
    description: "Solo usuarios registrados",
    icon: "person-outline",
  },
  {
    code: "kyc",
    label: "KYC",
    description: "Solo usuarios registrados que han validado su identidad",
    icon: "shield-checkmark-outline",
  },
];

export default function RoomScopeStep() {
  const [isPrivate, setIsPrivate] = useState(true);
  const [membersType, setMembersType] = useState(membersTypes[0].code);
  const { currentUser } = useAuthenticatedUser();
  const colors = useThemeColor();
  const { saveRoomScopeData, resetRoomData, roomNameData, roomTypeData } =
    useNewRoomData();
  const styles = getStyles(colors);
  const { execPromise: fnCreateRoom, isWaiting: isCreatingRoom } =
    useWaitingApp<CreateRoomData, BaseRoom>({
      functionToWait: (data: CreateRoomData) => createRoom(data),
      success: (room) => {
        router.replace(`/dashboard/myRooms/${room.code}`);
        resetRoomData();
      },
    });

  const scopeOptions = [
    { label: "Publica", selected: false, onPress: () => setIsPrivate(false) },
    {
      label: "Privada",
      selected: true,
      onPress: () => setIsPrivate(true),
    },
  ];
  const userTypeOptions = membersTypes.map(({ label, code }) => ({
    label,
    selected: membersType === code,
    onPress: () => setMembersType(code),
  }));

  const selectedUserType = membersTypes.find((e) => e.code === membersType);

  const onConfirm = () => {
    saveRoomScopeData({ isPrivate, membersType });
    if (isPrivate) {
      const dataToCreate: CreateRoomData = {
        label: roomNameData?.label || "",
        description: roomNameData?.description || "",
        ownerName: currentUser.userName,
        ownerUserId: currentUser.id,
        tags: roomTypeData?.tags || [],
        isPrivate,
        membersType,
      };
      fnCreateRoom(dataToCreate);
    } else {
      const dataToCreate: CreateRoomData = {
        label: roomNameData?.label || "",
        description: roomNameData?.description || "",
        ownerName: currentUser.userName,
        ownerUserId: currentUser.id,
        tags: roomTypeData?.tags || [],
        isPrivate,
        membersType,
      };
      fnCreateRoom(dataToCreate);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SpinnerApp visible={isCreatingRoom}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <NewStepMainIcon name="settings" />
            <ThemedText type="title" style={styles.title}>
              🔧 Configuración Final
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Define la privacidad y acceso a tu sala de votación
            </ThemedText>
          </View>

          <FormStepCard
            stepNumber={3}
            instructions="Configura la privacidad y acceso a tu sala de votación"
          />

          <View style={styles.section}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              🔒 Privacidad de la Sala
            </ThemedText>
            <OptionsButtonApp options={scopeOptions} />

            <CardApp style={styles.infoCard}>
              <IconApp
                name={isPrivate ? "eye-off" : "eye"}
                size={24}
                colorName={isPrivate ? "orange" : "green"}
                style={styles.infoIcon}
              />
              <View style={styles.infoContent}>
                {isPrivate ? (
                  <>
                    <ThemedText type="defaultSemiBold">Sala Privada</ThemedText>
                    <ThemedText style={styles.infoText}>
                      • Solo acceso por código de sala o invitación{"\n"}•
                      Oculta para usuarios que no sean miembros{"\n"}• Mayor
                      control sobre la participación
                    </ThemedText>
                  </>
                ) : (
                  <>
                    <ThemedText type="defaultSemiBold">Sala Pública</ThemedText>
                    <ThemedText style={styles.infoText}>
                      • Cualquier usuario puede unirse para participar{"\n"}•
                      Visible en la sección de Salas públicas{"\n"}• Los
                      resultados de votaciones serán públicos
                    </ThemedText>
                  </>
                )}
              </View>
            </CardApp>
          </View>

          <View style={styles.section}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              👥 Tipo de Usuarios
            </ThemedText>
            <OptionsButtonApp options={userTypeOptions} />

            <CardApp style={styles.infoCard}>
              <IconApp
                name={selectedUserType?.icon || "person-outline"}
                size={24}
                colorName="primary"
                style={styles.infoIcon}
              />
              <View style={styles.infoContent}>
                <ThemedText type="defaultSemiBold">
                  {selectedUserType?.label}
                </ThemedText>
                <ThemedText style={styles.infoText}>
                  {selectedUserType?.description}
                </ThemedText>
              </View>
            </CardApp>
          </View>

          <View style={styles.summaryContainer}>
            <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
              📋 Resumen
            </ThemedText>
            <CardApp style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <ThemedText>Tipo</ThemedText>
                <ThemedText colorName="primary">
                  {isPrivate ? "Privada" : "Pública"}
                </ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText>Acceso</ThemedText>
                <ThemedText colorName="primary">
                  {selectedUserType?.label}
                </ThemedText>
              </View>
            </CardApp>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <ButtonApp
            label="🎉 Crear Sala"
            onPress={onConfirm}
            type="secondary"
          />
          <ThemedText type="hint">
            ✅ ¡Listo! Tu sala estará disponible inmediatamente
          </ThemedText>
        </View>
      </SpinnerApp>
    </ThemedView>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      paddingBottom: 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 32,
      gap: 12,
    },
    title: {
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
      opacity: 0.7,
    },
    stepNumber: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    instructions: {
      flex: 1,
      fontSize: 15,
      lineHeight: 20,
    },
    section: {
      marginBottom: 32,
      gap: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    sectionTitle: {
      textAlign: "center",
    },
    infoCard: {
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    infoIcon: {
      marginRight: 12,
      marginTop: 2,
    },
    infoContent: {
      flex: 1,
    },
    infoText: {
      opacity: 0.8,
    },
    summaryContainer: {
      gap: 12,
    },
    summaryTitle: {
      textAlign: "center",
    },
    summaryCard: {
      gap: 12,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buttonContainer: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      alignItems: "center",
      gap: 10,
      backgroundColor: "white",
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    hint: {
      fontSize: 12,
      opacity: 0.6,
      textAlign: "center",
    },
  });
