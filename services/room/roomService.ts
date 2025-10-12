import { roomsMockResponse } from "./roomResponse";
import { Room } from "../../models/Room";

export const fetchRooms = (): Promise<Room[]> => {
  return Promise.resolve(roomsMockResponse);
};
