import { UserInvitationType } from "./UserInvitationType";

export interface PendingInvitation {
  id: string;
  type: UserInvitationType;
  value: string;
  timestamp: Date;
}
