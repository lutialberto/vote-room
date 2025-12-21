import { RadioButtonAppOption } from "@/components/RadioButtonApp";

export const CLOSE_TYPE_OPTIONS: (RadioButtonAppOption & {
  description: string;
})[] = [
  {
    value: "manualClose",
    label: "Cerrar manualmente",
    selected: true,
    description: "La votación se cerrará manualmente cuando decidas",
  },
  {
    value: "programmedClose",
    label: "Programar cierre",
    selected: false,
    description:
      "La votación se cerrará automáticamente después del tiempo definido",
  },
];
export const RELEASE_TYPE_OPTIONS: (RadioButtonAppOption & {
  description: string;
})[] = [
  {
    value: "releaseOnCreate",
    label: "Publicar al crear",
    selected: true,
    description: "La votación será visible inmediatamente después de crearla",
  },
  {
    value: "releaseScheduled",
    label: "Programar publicación",
    selected: false,
    description: "La votación se publicará en una fecha y hora específicas",
  },
  {
    value: "manualRelease",
    label: "Publicar manualmente",
    selected: false,
    description: "La votación se publicará manualmente cuando decidas",
  },
];
