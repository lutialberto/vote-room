import { RoomNameData, RoomScopeData, RoomTypeData } from "@/models/Room";
import { create } from "zustand";

type RoomState = {
  roomNameData: RoomNameData | null;
  roomTypeData: RoomTypeData | null;
  roomScopeData: RoomScopeData | null;
  saveRoomNameData: (data: RoomNameData) => void;
  saveRoomTypeData: (data: RoomTypeData) => void;
  saveRoomScopeData: (data: RoomScopeData) => void;
  resetRoomData: () => void;
};

export const useNewRoomData = create<RoomState>((set) => ({
  roomNameData: null,
  roomTypeData: null,
  roomScopeData: null,
  saveRoomNameData: (roomNameData: RoomNameData) =>
    set(() => ({ roomNameData })),
  saveRoomTypeData: (roomTypeData: RoomTypeData) =>
    set(() => ({ roomTypeData })),
  saveRoomScopeData: (roomScopeData: RoomScopeData) =>
    set(() => ({ roomScopeData })),
  resetRoomData: () =>
    set({ roomNameData: null, roomTypeData: null, roomScopeData: null }),
}));
