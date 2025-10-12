export type Room = {
  code: string;
  label: string;
  description: string;
  isOwner?: boolean;
  memberCount?: number;
  lastActivity?: string;
  status?: RoomStatus;
  hasUnreadVotes?: boolean;
};

export type RoomStatus = "active" | "paused" | "finished";
