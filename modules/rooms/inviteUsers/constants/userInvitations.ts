import { Ionicons } from "@expo/vector-icons";
import { UserInvitationType } from "../models/UserInvitationType";

export const USER_INVITATIONS: Record<
  UserInvitationType,
  {
    code: UserInvitationType;
    label: string;
    hint: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  userId: {
    code: "userId",
    label: "Código usuario",
    hint: "Escribe el código de usuario",
    icon: "person",
  },
  userName: {
    code: "userName",
    label: "Nombre usuario",
    hint: "Escribe el nombre de usuario",
    icon: "person-outline",
  },
  userEmail: {
    code: "userEmail",
    label: "Email usuario",
    hint: "Escribe el email del usuario",
    icon: "mail",
  },
  invitationListId: {
    code: "invitationListId",
    label: "Código lista de usuarios",
    hint: "Escribe el código de una sala de tu propiedad o lista guardada",
    icon: "list",
  },
  invitationListName: {
    code: "invitationListName",
    label: "Nombre lista de usuarios",
    hint: "Escribe el nombre de una sala de tu propiedad o lista guardada",
    icon: "list-outline",
  },
};
