import { Room } from "../../models/Room";
import { roomMemberServiceInstance } from "./roomMemberServiceImpl";

/**
 * ROOM MEMBER SERVICE - API FUNCTIONS
 *
 * Este archivo solo contiene las funciones públicas que usan los componentes.
 * La implementación real está en roomMemberServiceImpl.ts
 *
 * Para migrar a APIs reales:
 * 1. Cambiar roomMemberServiceInstance por una implementación que haga fetch()
 * 2. Las funciones de este archivo no cambian
 */

export const fetchRoomsByUser = (userId: number): Promise<Room[]> =>
  roomMemberServiceInstance.fetchRoomsByUser(userId);

export const joinRoom = (
  code: string,
  userId: number,
  key?: string
): Promise<{ roomCode: string }> =>
  roomMemberServiceInstance.joinRoom(code, userId, key);
