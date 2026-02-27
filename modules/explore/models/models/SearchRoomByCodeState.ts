import { Room } from "@/models/Room";

export type SearchState =
  | "error"
  | "idle"
  | "searching"
  | "found"
  | "not-found"
  | "request-key";

type SearchRoomByCodeBaseState = {
  state: SearchState;
};

type WithRoom = SearchRoomByCodeBaseState & {
  state: "found";
  room: Room;
};

type WithKeyErrorMessage = SearchRoomByCodeBaseState & {
  state: "request-key";
  room: Room;
  keyErrorMessage?: string;
};

type WithoutRoom = SearchRoomByCodeBaseState & {
  state: "error" | "idle" | "searching" | "not-found";
};

export type SearchRoomByCodeState =
  | WithRoom
  | WithoutRoom
  | WithKeyErrorMessage;
