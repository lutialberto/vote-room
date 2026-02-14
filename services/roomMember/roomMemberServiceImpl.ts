import { roomMembersMockResponse } from "./roomMemberResponse";
import { Room } from "../../models/Room";
import { RoomMember, RoomMemberWithUser } from "../../models/RoomMember";
import { successPromiseBehavior } from "../serviceUtilsImpl";
import { roomCoreService } from "../room/roomCoreService";
import { userServiceInstance } from "../user/userServiceImpl";

export class RoomMemberServiceImpl {
  private roomMembers: RoomMember[] = [...roomMembersMockResponse];

  async fetchRoomsByUser(userId: number): Promise<Room[]> {
    return successPromiseBehavior(() => this.getInstantRoomsByUser(userId));
  }

  async fetchRoomMembersByRoom(
    roomCode: string
  ): Promise<RoomMemberWithUser[]> {
    return successPromiseBehavior(() =>
      this.roomMembers
        .filter((roomMember) => roomMember.roomCode === roomCode)
        .map((roomMember) => {
          const user = userServiceInstance.getInstantUserById(
            roomMember.userId
          );
          if (!user) {
            throw new Error(
              `User ${roomMember.userId} not found as room member for room ${roomMember.roomCode}`
            );
          }
          return {
            ...roomMember,
            user,
          } as RoomMemberWithUser;
        })
    );
  }

  getInstantRoomsByUser(userId: number) {
    const userRoomCodes = this.roomMembers
      .filter((roomMember) => roomMember.userId === userId)
      .map((roomMember) => roomMember.roomCode);

    const allRooms = roomCoreService.getInstantRooms();
    const userRooms = allRooms.filter((room) =>
      userRoomCodes.includes(room.code)
    );

    return userRooms;
  }

  joinRoomInstant(
    code: string,
    userId: number,
    key?: string
  ): { roomCode: string } {
    const room = roomCoreService.getInstantRoomByCode(code);
    if (!room) {
      throw new Error(`Room not found: ${code}`);
    }
    if (room.isPrivate && key && room.key !== key) {
      throw new Error(`Invalid room key ${key} for room: ${code}`);
    }

    const existingMember = this.roomMembers.find(
      (member) => member.roomCode === code && member.userId === userId
    );
    if (existingMember) {
      throw new Error(`User ${userId} already in room: ${code}`);
    }

    const newId = this.getNextId();
    const newRoomMember: RoomMember = {
      id: newId,
      roomCode: code,
      userId,
    };
    this.roomMembers.push(newRoomMember);
    return { roomCode: code };
  }

  async joinRoom(
    code: string,
    userId: number,
    key?: string
  ): Promise<{ roomCode: string }> {
    return successPromiseBehavior(async () => {
      return this.joinRoomInstant(code, userId, key);
    });
  }

  private getNextId(): number {
    return this.roomMembers.length > 0
      ? Math.max(...this.roomMembers.map((m) => m.id)) + 1
      : 1;
  }
}

export const roomMemberServiceInstance = new RoomMemberServiceImpl();
