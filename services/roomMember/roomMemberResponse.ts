import { Room } from "@/models/Room";
import { RoomMember } from "@/models/RoomMember";

export let roomMembersMockResponse: RoomMember[] = [
  {
    id: 1,
    roomCode: "ROOM1",
    userId: 1,
  },
  {
    id: 2,
    roomCode: "ROOM1",
    userId: 2,
  },
  {
    id: 3,
    roomCode: "ROOM1",
    userId: 3,
  },
  {
    id: 4,
    roomCode: "WORK2",
    userId: 1,
  },
  {
    id: 5,
    roomCode: "WORK2",
    userId: 4,
  },
  {
    id: 6,
    roomCode: "PARTY",
    userId: 1,
  },
  {
    id: 7,
    roomCode: "TRIP",
    userId: 5,
  },
  {
    id: 8,
    roomCode: "BOOKCLUB",
    userId: 1,
  },
  {
    id: 9,
    roomCode: "GAMENIGHT",
    userId: 6,
  },
  {
    id: 10,
    roomCode: "COMMUNITY",
    userId: 1,
  },
  {
    id: 11,
    roomCode: "COMMUNITY",
    userId: 7,
  },
  {
    id: 12,
    roomCode: "COMMUNITY",
    userId: 8,
  },
  {
    id: 13,
    roomCode: "WORK2",
    userId: 9,
  },
  {
    id: 14,
    roomCode: "WORK2",
    userId: 10,
  },
  {
    id: 15,
    roomCode: "WORK2",
    userId: 11,
  },
  {
    id: 16,
    roomCode: "WORK2",
    userId: 12,
  },
  {
    id: 17,
    roomCode: "WORK2",
    userId: 13,
  },
  {
    id: 18,
    roomCode: "WORK2",
    userId: 14,
  },
  {
    id: 19,
    roomCode: "WORK2",
    userId: 15,
  },
];

export function addRoomMember(roomCode: string, userId: number): void {
  const newId =
    roomMembersMockResponse
      .map((i) => i.id)
      .reduce((a, b) => Math.max(a, b), 0) + 1;
  const newRoomMember: RoomMember = {
    id: newId,
    roomCode,
    userId,
  };
  roomMembersMockResponse.push(newRoomMember);
}
