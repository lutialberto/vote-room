export interface PendingRoomInvitationRequest {
  id: number;
  roomCode: string;
  roomName: string;
  roomDescription: string;
  invitationDate: Date;
  invitedUserId: number;
  confirmed?: boolean;
}
