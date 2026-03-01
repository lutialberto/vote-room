import { IconName } from "@/components/IconApp";
import { EntityType } from "./models/entityType";

export const ENTITY_TYPE_DATA: Record<
  EntityType,
  { label: string; icon: IconName }
> = {
  room: { label: "Sala", icon: "people" },
  voting: { label: "Votación", icon: "bar-chart-outline" },
  award: { label: "Premiación", icon: "trophy" },
};
