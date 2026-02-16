const DEEP_LINK_BASE_URL = "vote-room://";

export const getDeepLinkRoomDetailInvitation = (roomId: string, key?: string) =>
  `${DEEP_LINK_BASE_URL}/room/${roomId}/invitation${key ? `?key=${key}` : ""}`;
