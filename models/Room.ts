export type Room = {
  code: string;
  label: string;
  description: string;
  owner: string;
  isPrivate: boolean;
  memberCount?: number;
  lastActivity?: string;
  status: RoomStatus;
  hasUnreadVotes?: boolean;
};

export type RoomStatus = "active" | "paused" | "finished";
