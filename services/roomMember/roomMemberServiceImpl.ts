import { roomMembersMockResponse } from "./roomMemberResponse";
import { Room } from "../../models/Room";
import { RoomMember } from "../../models/RoomMember";
import { fetchRooms, getRoomByCode } from "../room/roomService";
import { successPromiseBehavior } from "../serviceUtilsImpl";

export class RoomMemberServiceImpl {
  private roomMembers: RoomMember[] = [...roomMembersMockResponse];

  async fetchRoomsByUser(userId: number): Promise<Room[]> {
    return successPromiseBehavior(async () => {
      const userRoomCodes = this.roomMembers
        .filter((roomMember) => roomMember.userId === userId)
        .map((roomMember) => roomMember.roomCode);

      const allRooms = await fetchRooms();
      const userRooms = allRooms.filter((room) =>
        userRoomCodes.includes(room.code)
      );

      return userRooms;
    });
  }

  async joinRoom(code: string, userId: number, key?: string): Promise<void> {
    return successPromiseBehavior(async () => {
      const room = await getRoomByCode(code);
      if (!room) {
        throw new Error("Room not found");
      }
      if (room.isPrivate && room.key !== key) {
        throw new Error("Invalid room key");
      }

      const existingMember = this.roomMembers.find(
        (member) => member.roomCode === code && member.userId === userId
      );
      if (existingMember) {
        throw new Error("User already in room");
      }

      const newId = this.getNextId();
      const newRoomMember: RoomMember = {
        id: newId,
        roomCode: code,
        userId,
      };
      this.roomMembers.push(newRoomMember);
    });
  }

  private getNextId(): number {
    return this.roomMembers.length > 0
      ? Math.max(...this.roomMembers.map((m) => m.id)) + 1
      : 1;
  }
}

export const roomMemberServiceInstance = new RoomMemberServiceImpl();
