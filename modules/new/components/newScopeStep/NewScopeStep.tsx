import FormStepCard from "@/components/FormStepCard";
import { IconName } from "@/components/IconApp";
import InputOptionsAdvanceApp, {
  InputOptionsAdvanceAppOptionItemProps,
} from "@/components/InputOptionsAdvanceApp";
import { ColorScheme } from "@/constants/Colors";
import { MembersType } from "@/models/ScopeConfig";
import { useNewScopeStep } from "./useNewScopeStep";
import { useEffect } from "react";

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
  stepNumber: number;
  isReadOnly: boolean;
}

export default function NewScopeStep({
  stepNumber,
  isReadOnly,
}: NewScopeStepProps) {
  const { saveIsPrivate, saveMembersType, resetScopeConfigData } =
    useNewScopeStep();

  useEffect(() => {
    resetScopeConfigData();
  }, []);

  const scopeOptions: InputOptionsAdvanceAppOptionItemProps[] = [
    {
      code: "public",
      label: "Publica",
      selected: true,
      icon: "eye",
      iconColor: "green" as keyof ColorScheme,
      infoText: [
        "Cualquier usuario puede unirse para participar",
        "Visible en la sección de Explorar",
        "Los resultados de las interacciones serán públicos",
      ],
      onPress: () => saveIsPrivate(false),
    },
    {
      code: "private",
      label: "Privada",
      icon: "eye-off",
      iconColor: "orange" as keyof ColorScheme,
      infoText: [
        "Solo acceso por código o invitación",
        "Oculto para usuarios que no sean miembros",
        "Mayor control sobre la participación",
      ],
      onPress: () => saveIsPrivate(true),
    },
  ];
  const userTypeOptions: InputOptionsAdvanceAppOptionItemProps[] =
    membersTypes.map(({ label, icon, description, code }) => ({
      code,
      label,
      selected: code === membersTypes[0].code,
      icon,
      infoText: [description],
      onPress: () => saveMembersType(code),
    }));

  return (
    <>
      <FormStepCard
        stepNumber={stepNumber}
        instructions="Configura la privacidad y acceso a tu sala de votación"
      />

      <InputOptionsAdvanceApp
        label="🔒 Privacidad"
        options={scopeOptions}
        isReadOnly={isReadOnly}
      />
      <InputOptionsAdvanceApp
        label="👥 Tipo de Usuarios Miembro"
        options={userTypeOptions}
        isReadOnly={isReadOnly}
      />
    </>
  );
}
