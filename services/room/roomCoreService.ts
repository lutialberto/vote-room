import { roomsMockResponse } from "./roomResponse";
import { Room } from "../../models/Room";

/**
 * Core service with room data access - no external service dependencies
 * Used to break circular dependencies between roomService and roomMemberService
 */
export class RoomCoreService {
  private rooms: Room[] = [...roomsMockResponse];

  getInstantRooms(): Room[] {
    return [...this.rooms];
  }

  getInstantRoomByCode(code: string): Room | undefined {
    return this.rooms.find((room) => room.code === code);
  }

  addInstantRoom(room: Room): void {
    this.rooms.push(room);
  }
}

export const roomCoreService = new RoomCoreService();
