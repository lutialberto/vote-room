export interface PendingInvitationRequest {
  id: number;
  entityId: string;
  entityType: "room" | "voting";
  name: string;
  description: string;
  invitationDate: Date;
  invitedUserId: number;
  confirmed?: boolean;
}
