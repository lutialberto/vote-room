export type BaseRoom = {
  code: string;
  label: string;
  description: string;
  ownerName: string;
  ownerUserId: number;
  memberCount?: number;
  lastActivity?: string;
  status: RoomStatus;
  hasUnreadVotes?: boolean;
  tags?: string[];
  isPrivate: boolean;
  membersType: MembersType;
};
export type MembersType = "unrestricted" | "authenticated" | "kyc";

export type PrivateRoomType = BaseRoom & {
  isPrivate: true;
  key: string;
};

export type PublicRoomType = BaseRoom & {
  isPrivate: false;
};

export type PublicRoomTypeFilter = Partial<
  Pick<PublicRoomType, "code" | "label" | "ownerName" | "tags">
>;

export type Room = PrivateRoomType | PublicRoomType;

export type RoomStatus = "active" | "paused" | "finished";

type CreatePrivateRoomData = Omit<
  BaseRoom,
  "code" | "memberCount" | "lastActivity" | "status" | "hasUnreadVotes"
> & {
  isPrivate: true;
  key?: string;
};

type CreatePublicRoomData = Omit<
  BaseRoom,
  "code" | "memberCount" | "lastActivity" | "status" | "hasUnreadVotes"
> & {
  isPrivate: false;
};

export type CreateRoomData = CreatePrivateRoomData | CreatePublicRoomData;

export type RoomNameData = Pick<CreateRoomData, "label" | "description">;
export type RoomTypeData = Pick<CreateRoomData, "tags">;
export type RoomScopeData = Pick<CreateRoomData, "isPrivate" | "membersType">;
