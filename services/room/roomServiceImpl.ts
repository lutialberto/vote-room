import {
  Room,
  CreateRoomData,
  PublicRoomType,
  PublicRoomTypeFilter,
  BaseRoom,
} from "../../models/Room";
import { successPromiseBehavior } from "../serviceUtilsImpl";
import { roomCoreService } from "./roomCoreService";
import { roomMemberServiceInstance } from "../roomMember/roomMemberServiceImpl";

// Implementación del servicio con estado en memoria
export class RoomServiceImpl {
  async fetchRooms(): Promise<Room[]> {
    return successPromiseBehavior(this.getInstantRooms);
  }

  getInstantRooms(): Room[] {
    return roomCoreService.getInstantRooms();
  }

  fetchPublicRooms = async (
    userId: number,
    filter: PublicRoomTypeFilter
  ): Promise<PublicRoomType[]> =>
    successPromiseBehavior<PublicRoomType[]>(() => {
      const userRooms = roomMemberServiceInstance.getInstantRoomsByUser(userId);
      const userRoomCodes = userRooms.map((room) => room.code);

      const rooms = roomCoreService.getInstantRooms();
      return rooms.filter(
        (room) =>
          !room.scope.isPrivate &&
          !userRoomCodes.includes(room.code) &&
          (!filter.code || room.code.includes(filter.code)) &&
          (!filter.label || room.label.includes(filter.label)) &&
          (!filter.ownerName || room.ownerName.includes(filter.ownerName)) &&
          ((filter.tags?.length ?? 0) === 0 ||
            filter.tags?.some((tag) => (room.tags ?? []).includes(tag)))
      ) as PublicRoomType[];
    });

  getInstantRoomByCode(code: string): Room | null {
    const room = roomCoreService.getInstantRoomByCode(code);
    return room ? { ...room } : null;
  }

  async fetchRoomByCode(code: string): Promise<Room | null> {
    return successPromiseBehavior(() => {
      return this.getInstantRoomByCode(code);
    });
  }

  async createRoom(roomData: CreateRoomData): Promise<Room> {
    return successPromiseBehavior(() => {
      const baseData: BaseRoom = {
        ...roomData,
        status: "active",
        code: this.generateRoomCode(),
        memberCount: 1,
        lastActivity: "ahora" as const,
      };

      const newRoom: Room = roomData.scope.isPrivate
        ? {
            ...baseData,
            scope: {
              ...roomData.scope,
              key: roomData.scope.key || this.generateKey(),
            },
          }
        : {
            ...baseData,
            scope: roomData.scope,
          };

      roomCoreService.addInstantRoom(newRoom);
      return { ...newRoom };
    });
  }

  private generateRoomCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private generateKey(): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

export const roomServiceInstance = new RoomServiceImpl();
