import { roomsMockResponse } from "./roomResponse";
import { Room, BaseRoom, CreateRoomData } from "../../models/Room";

// Implementación del servicio con estado en memoria
export class RoomServiceImpl {
  private rooms: Room[] = [...roomsMockResponse];

  async fetchRooms(): Promise<Room[]> {
    return [...this.rooms];
  }

  async getRoomByCode(code: string): Promise<Room | null> {
    const room = this.rooms.find((r) => r.code === code);
    return room ? { ...room } : null;
  }

  async createRoom(roomData: CreateRoomData): Promise<Room> {
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
