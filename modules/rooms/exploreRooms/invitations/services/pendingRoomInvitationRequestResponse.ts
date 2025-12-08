import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";

export const pendingRoomInvitationRequestMockResponse: PendingRoomInvitationRequest[] =
  [
    {
      id: 1,
      roomCode: "ROOM1",
      roomName: "Sala de Votación A",
      roomDescription: "Descripción de la Sala A",
      invitationDate: new Date("2024-06-01"),
      invitedUserId: 1,
    },
    {
      id: 2,
      roomCode: "TRIP",
      roomName: "Sala de Votación B",
      roomDescription: "Descripción de la Sala B",
      invitationDate: new Date("2024-06-05"),
      invitedUserId: 1,
    },
    {
      id: 3,
      roomCode: "ROOM1",
      roomName: "Sala de Votación C",
      roomDescription: "Descripción de la Sala C",
      invitationDate: new Date("2024-06-10"),
      invitedUserId: 2,
    },
    {
      id: 4,
      roomCode: "WORK2",
      roomName: "Sala de Votación D",
      roomDescription: "Descripción de la Sala D",
      invitationDate: new Date("2024-06-15"),
      invitedUserId: 2,
    },
    {
      id: 5,
      roomCode: "PARTY",
      roomName: "Sala de Votación E",
      roomDescription: "Descripción de la Sala E",
      invitationDate: new Date("2024-06-20"),
      invitedUserId: 3,
    },
  ];
