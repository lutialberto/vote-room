export type BaseRoom = {
  code: string;
  label: string;
  description: string;
  owner: string;
  memberCount?: number;
  lastActivity?: string;
  status: RoomStatus;
  hasUnreadVotes?: boolean;
};

export type PrivateRoomType = BaseRoom & {
  isPrivate: true;
  key: string;
};

export type PublicRoomType = BaseRoom & {
  isPrivate: false;
};

export type Room = PrivateRoomType | PublicRoomType;

export type RoomStatus = "active" | "paused" | "finished";

type CreatePrivateRoomData = Omit<
  BaseRoom,
  "code" | "memberCount" | "lastActivity"
> & {
  isPrivate: true;
  key?: string;
};

type CreatePublicRoomData = Omit<
  BaseRoom,
  "code" | "memberCount" | "lastActivity"
> & {
  isPrivate: false;
};

export type CreateRoomData = CreatePrivateRoomData | CreatePublicRoomData;
