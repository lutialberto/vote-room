import { ButtonApp } from "@/components/ButtonApp";
import { CardApp } from "@/components/CardApp";
import FormStepCard from "@/components/FormStepCard";
import { IconApp, IconName } from "@/components/IconApp";
import { OptionsButtonApp } from "@/components/OptionsButtonApp";
import { ThemedText } from "@/components/ThemedText";
import { ColorScheme } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MembersType, ScopeConfig } from "@/models/ScopeConfig";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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

export interface NewScopeStepProps {
  onConfirm: (data: ScopeConfig) => void;
  stepNumber: number;
}

export default function NewScopeStep({
  onConfirm,
  stepNumber,
}: NewScopeStepProps) {
  const [isPrivate, setIsPrivate] = useState(true);
  const [membersType, setMembersType] = useState(membersTypes[0].code);
  const colors = useThemeColor();
  const styles = getStyles(colors);

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
  return (
    <>
      <FormStepCard
        stepNumber={stepNumber}
        instructions="Configura la privacidad y acceso a tu sala de votación"
      />

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          🔒 Privacidad
        </ThemedText>
        <OptionsButtonApp options={scopeOptions} />

        <CardApp style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <IconApp
              name={isPrivate ? "eye-off" : "eye"}
              size={24}
              colorName={isPrivate ? "orange" : "green"}
            />
            <ThemedText type="defaultSemiBold">
              {isPrivate ? "Sala Privada" : "Sala Pública"}
            </ThemedText>
          </View>
          {isPrivate ? (
            <ThemedText style={styles.infoText}>
              • Solo acceso por código o invitación{"\n"}• Oculto para usuarios
              que no sean miembros{"\n"}• Mayor control sobre la participación
            </ThemedText>
          ) : (
            <ThemedText style={styles.infoText}>
              • Cualquier usuario puede unirse para participar{"\n"}• Visible en
              la sección de Explorar{"\n"}• Los resultados de las interacciones
              serán públicos
            </ThemedText>
          )}
        </CardApp>
      </View>

      <View style={styles.section}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          👥 Tipo de Usuarios Miembro
        </ThemedText>
        <OptionsButtonApp options={userTypeOptions} />

        <CardApp style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <IconApp
              name={selectedUserType?.icon || "person-outline"}
              size={24}
              colorName="primary"
            />
            <ThemedText type="defaultSemiBold">
              {selectedUserType?.label}
            </ThemedText>
          </View>
          <ThemedText style={styles.infoText}>
            {selectedUserType?.description}
          </ThemedText>
        </CardApp>
      </View>

      <ButtonApp
        label="Confirmar"
        onPress={() => onConfirm({ isPrivate, membersType })}
      />
    </>
  );
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    section: {
      marginBottom: 12,
      gap: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    sectionTitle: {
      textAlign: "center",
    },
    infoCard: {
      borderRadius: 12,
      width: "100%",
    },
    infoHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    infoText: {
      opacity: 0.8,
    },
  });
