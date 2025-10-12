import {
  StyleSheet,
  TextInput,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { ButtonApp } from "@/components/ButtonApp";
import { OptionsButtonApp } from "@/components/OptionsButtonApp";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormStepCard from "@/components/FormStepCard";

const userTypes = [
  {
    code: "unrestricted",
    label: "Irrestricto",
    description: "Cualquier usuario puede acceder",
    icon: "globe-outline" as const,
  },
  {
    code: "authenticated",
    label: "Autenticado",
    description: "Solo usuarios registrados",
    icon: "person-outline" as const,
  },
  {
    code: "kyc",
    label: "KYC",
    description: "Solo usuarios registrados que han validado su identidad",
    icon: "shield-checkmark-outline" as const,
  },
];

export default function RoomScopeStep() {
  const [isPublic, setIsPublic] = useState(true);
  const [userType, setUserType] = useState(userTypes[0].code);

  const scopeOptions = [
    { label: "Publica", selected: isPublic, onPress: () => setIsPublic(true) },
    {
      label: "Privada",
      selected: !isPublic,
      onPress: () => setIsPublic(false),
    },
  ];
  const userTypeOptions = userTypes.map(({ label, code }) => ({
    label,
    selected: userType === code,
    onPress: () => setUserType(code),
  }));

  const selectedUserType = userTypes.find((e) => e.code === userType);

  const onConfirm = () => {
    // TODO: falta definir que hacer con los datos
    const roomId = 1;
    router.replace(`/${roomId}/shareRoom`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="settings" size={48} color="#007AFF" />
          </View>
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

          <View style={styles.infoCard}>
            <Ionicons
              name={isPublic ? "eye" : "eye-off"}
              size={24}
              color={isPublic ? "#34C759" : "#FF9500"}
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              {isPublic ? (
                <>
                  <ThemedText type="defaultSemiBold">Sala Pública</ThemedText>
                  <ThemedText style={styles.infoText}>
                    • Cualquier usuario puede unirse para participar{"\n"}•
                    Visible en la sección de Salas públicas{"\n"}• Los
                    resultados de votaciones serán públicos
                  </ThemedText>
                </>
              ) : (
                <>
                  <ThemedText type="defaultSemiBold">Sala Privada</ThemedText>
                  <ThemedText style={styles.infoText}>
                    • Solo acceso por código de sala o invitación{"\n"}• Oculta
                    para usuarios que no sean miembros{"\n"}• Mayor control
                    sobre la participación
                  </ThemedText>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            👥 Tipo de Usuarios
          </ThemedText>
          <OptionsButtonApp options={userTypeOptions} />

          <View style={styles.infoCard}>
            <Ionicons
              name={selectedUserType?.icon || "person-outline"}
              size={24}
              color="#007AFF"
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
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
            📋 Resumen
          </ThemedText>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <ThemedText>Tipo</ThemedText>
              <ThemedText style={styles.summaryValue}>
                {isPublic ? "Pública" : "Privada"}
              </ThemedText>
            </View>
            <View style={styles.summaryRow}>
              <ThemedText>Acceso</ThemedText>
              <ThemedText style={styles.summaryValue}>
                {selectedUserType?.label}
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonApp label="🎉 Crear Sala" onPress={onConfirm} type="secondary" />
        <ThemedText type="hint">
          ✅ ¡Listo! Tu sala estará disponible inmediatamente
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  iconContainer: {
    backgroundColor: "#f0f9ff",
    borderRadius: 50,
    padding: 20,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
  instructionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  stepIndicator: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "#fff",
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
    backgroundColor: "#f8f9fa",
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
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryValue: {
    color: "#1976d2",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  hint: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
  },
});
