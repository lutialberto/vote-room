import {
  PrivateScopeConfig,
  PublicScopeConfig,
  ScopeConfig,
} from "./ScopeConfig";

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
  scope: ScopeConfig;
};

export type PrivateRoomType = BaseRoom & {
  scope: PrivateScopeConfig;
};

export type PublicRoomType = BaseRoom & {
  scope: PublicScopeConfig;
};

export type PublicRoomTypeFilter = Partial<
  Pick<BaseRoom, "code" | "label" | "ownerName" | "tags">
>;

export type Room = PrivateRoomType | PublicRoomType;

export type RoomStatus = "active" | "paused" | "finished";

type CreateRoomBaseData = Omit<
  BaseRoom,
  "code" | "memberCount" | "lastActivity" | "status" | "hasUnreadVotes"
>;

export type CreatePrivateRoomData = CreateRoomBaseData & {
  scope: Omit<PrivateScopeConfig, "key"> & { key?: string };
};

export type CreatePublicRoomData = CreateRoomBaseData & {
  scope: PublicScopeConfig;
};

export type CreateRoomData = CreatePrivateRoomData | CreatePublicRoomData;

export type RoomNameData = Pick<CreateRoomData, "label" | "description">;
export type RoomTypeData = Pick<CreateRoomData, "tags">;
export type RoomScopeData = Pick<CreateRoomData, "scope">;
