import { roomsMockResponse } from "./roomResponse";
import { Room, CreateRoomData, PublicRoomType } from "../../models/Room";
import { successPromiseBehavior } from "../serviceUtilsImpl";
import { roomMemberServiceInstance } from "../roomMember/roomMemberServiceImpl";

// Implementación del servicio con estado en memoria
export class RoomServiceImpl {
  private rooms: Room[] = [...roomsMockResponse];

  async fetchRooms(): Promise<Room[]> {
    return successPromiseBehavior(this.getInstantRooms);
  }

  getInstantRooms(): Room[] {
    return [...this.rooms];
  }

  fetchPublicRooms = async (userId: number): Promise<PublicRoomType[]> =>
    successPromiseBehavior<PublicRoomType[]>(() => {
      const userRooms = roomMemberServiceInstance.getInstantRoomsByUser(userId);
      const userRoomCodes = userRooms.map((room) => room.code);
      return this.rooms.filter(
        (room) => !room.isPrivate && !userRoomCodes.includes(room.code)
      ) as PublicRoomType[];
    });

  async getRoomByCode(code: string): Promise<Room | null> {
    return successPromiseBehavior(() => {
      const room = this.rooms.find((r) => r.code === code);
      return room ? { ...room } : null;
    });
  }

  async createRoom(roomData: CreateRoomData): Promise<Room> {
    return successPromiseBehavior(() => {
      const baseData = {
        ...roomData,
        code: this.generateRoomCode(),
        memberCount: 1,
        lastActivity: "ahora" as const,
      };

      const newRoom: Room = roomData.isPrivate
        ? {
            ...baseData,
            isPrivate: true,
            key: roomData.key || this.generateKey(),
          }
        : { ...baseData, isPrivate: false };

      this.rooms.push(newRoom);
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
