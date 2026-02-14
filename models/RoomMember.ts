import { UserBase } from "./User";

export interface RoomMember {
  id: number;
  roomCode: string;
  userId: number;
}

export interface RoomMemberWithUser extends RoomMember {
  user: UserBase;
}
