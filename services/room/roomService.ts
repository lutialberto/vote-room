import {
  CreateRoomData,
  PublicRoomType,
  PublicRoomTypeFilter,
  Room,
} from "../../models/Room";
import { roomServiceInstance } from "./roomServiceImpl";

/**
 * ROOM SERVICE - API FUNCTIONS
 *
 * Este archivo solo contiene las funciones públicas que usan los componentes.
 * La implementación real está en roomServiceImpl.ts
 *
 * Para migrar a APIs reales:
 * 1. Cambiar roomServiceInstance por una implementación que haga fetch()
 * 2. Las funciones de este archivo no cambian
 */

// Funciones públicas del servicio
export const fetchPublicRooms = (
  userId: number,
  filter: PublicRoomTypeFilter
): Promise<PublicRoomType[]> =>
  roomServiceInstance.fetchPublicRooms(userId, filter);

export const fetchRooms = (): Promise<Room[]> =>
  roomServiceInstance.fetchRooms();

export const getRoomByCode = (code: string): Promise<Room | null> =>
  roomServiceInstance.getRoomByCode(code);

export const createRoom = (roomData: CreateRoomData): Promise<Room> =>
  roomServiceInstance.createRoom(roomData);
