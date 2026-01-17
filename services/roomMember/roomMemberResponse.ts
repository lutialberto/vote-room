import { Room } from "@/models/Room";
import { RoomMember } from "@/models/RoomMember";

export let roomMembersMockResponse: RoomMember[] = [
  // ROOM1: "Votación Familiar" - memberCount: 5 - Familia Alice
  { id: 1, roomCode: "ROOM1", userId: 1 }, // Alice (owner)
  { id: 2, roomCode: "ROOM1", userId: 2 }, // Bob
  { id: 3, roomCode: "ROOM1", userId: 3 }, // Charlie
  { id: 4, roomCode: "ROOM1", userId: 4 }, // Diana
  { id: 5, roomCode: "ROOM1", userId: 5 }, // Ethan

  // WORK2: "Reunión de Trabajo" - memberCount: 12 - Compañeros de trabajo
  { id: 6, roomCode: "WORK2", userId: 2 }, // Bob (owner)
  { id: 7, roomCode: "WORK2", userId: 1 }, // Alice
  { id: 8, roomCode: "WORK2", userId: 6 }, // Fiona
  { id: 9, roomCode: "WORK2", userId: 7 }, // George
  { id: 10, roomCode: "WORK2", userId: 8 }, // Hannah
  { id: 11, roomCode: "WORK2", userId: 9 }, // Ian
  { id: 12, roomCode: "WORK2", userId: 4 }, // Diana
  { id: 13, roomCode: "WORK2", userId: 5 }, // Ethan

  // PARTY: "Fiesta de Cumpleaños" - memberCount: 8 - Amigos de Charlie
  { id: 14, roomCode: "PARTY", userId: 3 }, // Charlie (owner)
  { id: 15, roomCode: "PARTY", userId: 1 }, // Alice
  { id: 16, roomCode: "PARTY", userId: 5 }, // Ethan
  { id: 17, roomCode: "PARTY", userId: 6 }, // Fiona
  { id: 18, roomCode: "PARTY", userId: 8 }, // Hannah
  { id: 19, roomCode: "PARTY", userId: 9 }, // Ian

  // TRIP: "Viaje con Amigos" - memberCount: 4 - Grupo pequeño de viaje
  { id: 20, roomCode: "TRIP", userId: 4 }, // Diana (owner)
  { id: 21, roomCode: "TRIP", userId: 2 }, // Bob
  { id: 22, roomCode: "TRIP", userId: 6 }, // Fiona
  { id: 23, roomCode: "TRIP", userId: 7 }, // George

  // BOOKCLUB: "Club de Lectura" - memberCount: 6 - Lectores
  { id: 24, roomCode: "BOOKCLUB", userId: 5 }, // Ethan (owner)
  { id: 25, roomCode: "BOOKCLUB", userId: 3 }, // Charlie
  { id: 26, roomCode: "BOOKCLUB", userId: 7 }, // George
  { id: 27, roomCode: "BOOKCLUB", userId: 8 }, // Hannah
  { id: 28, roomCode: "BOOKCLUB", userId: 9 }, // Ian

  // GAMENIGHT: "Noche de Juegos" - memberCount: 5 - Gamers
  { id: 29, roomCode: "GAMENIGHT", userId: 6 }, // Fiona (owner)
  { id: 30, roomCode: "GAMENIGHT", userId: 1 }, // Alice
  { id: 31, roomCode: "GAMENIGHT", userId: 3 }, // Charlie
  { id: 32, roomCode: "GAMENIGHT", userId: 4 }, // Diana
  { id: 33, roomCode: "GAMENIGHT", userId: 9 }, // Ian

  // COMMUNITY: "Reunión Comunitaria" - memberCount: 10 - Vecinos
  { id: 34, roomCode: "COMMUNITY", userId: 7 }, // George (owner)
  { id: 35, roomCode: "COMMUNITY", userId: 1 }, // Alice
  { id: 36, roomCode: "COMMUNITY", userId: 2 }, // Bob
  { id: 37, roomCode: "COMMUNITY", userId: 3 }, // Charlie
  { id: 38, roomCode: "COMMUNITY", userId: 4 }, // Diana
  { id: 39, roomCode: "COMMUNITY", userId: 5 }, // Ethan
  { id: 40, roomCode: "COMMUNITY", userId: 6 }, // Fiona
  { id: 41, roomCode: "COMMUNITY", userId: 8 }, // Hannah
  { id: 42, roomCode: "COMMUNITY", userId: 9 }, // Ian
];

export function addRoomMember(roomCode: string, userId: number): void {
  const newId =
    roomMembersMockResponse
      .map((i) => i.id)
      .reduce((a, b) => Math.max(a, b), 0) + 1;
  const newRoomMember: RoomMember = {
    id: newId,
    roomCode,
    userId,
  };
  roomMembersMockResponse.push(newRoomMember);
}
