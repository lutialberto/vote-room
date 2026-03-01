import { UserBase } from "@/models/User";
import { EntityType } from "@/modules/entities/models/entityType";

export interface PendingInvitationRequest {
  id: number;
  entityId: string;
  entityType: EntityType;
  name: string;
  description: string;
  invitationDate: Date;
  invitedUserId: number;
  confirmed?: boolean;
}

export interface PendingInvitationRequestDetail extends PendingInvitationRequest {
  invitedUser: UserBase;
}
