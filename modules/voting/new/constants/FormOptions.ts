import { InputOptionsAdvanceAppOptionItemProps } from "@/components/InputOptionsAdvanceApp";
import { RadioButtonAppOption } from "@/components/RadioButtonApp";

export const BASE_VOTING_TYPE_OPTIONS: (RadioButtonAppOption & {
  description: string;
})[] = [
  {
    value: "boolean",
    label: "Sí/No",
    selected: false,
    description: "Votación con dos opciones: Sí o No",
  },
  {
    value: "options",
    label: "Opciones",
    selected: false,
    description: "Votación con múltiples opciones para elegir",
  },
];
export const CLOSE_TYPE_OPTIONS: InputOptionsAdvanceAppOptionItemProps[] = [
  {
    code: "manualClose",
    icon: "timer-outline",
    label: "Manual",
    selected: true,
    infoText: ["La votación se cerrará manualmente cuando decidas"],
    onPress: () => {},
  },
  {
    code: "programmedClose",
    icon: "calendar-outline",
    label: "Programada",
    selected: false,
    infoText: [
      "La votación se cerrará automáticamente después del tiempo configurado",
    ],
    onPress: () => {},
  },
];
export const RELEASE_TYPE_OPTIONS: InputOptionsAdvanceAppOptionItemProps[] = [
  {
    code: "releaseOnCreate",
    icon: "rocket-outline",
    label: "Inmediata",
    selected: true,
    infoText: ["La votación será visible inmediatamente después de crearla"],
    onPress: () => {},
  },
  {
    code: "releaseScheduled",
    icon: "timer-outline",
    label: "Programada",
    selected: false,
    infoText: ["La votación se publicará en una fecha y hora específicas"],
    onPress: () => {},
  },
  {
    code: "manualRelease",
    icon: "hand-left-outline",
    label: "Manual",
    selected: false,
    infoText: ["La votación se publicará manualmente cuando decidas"],
    onPress: () => {},
  },
];
