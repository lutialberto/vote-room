import { PendingRoomInvitationRequest } from "../models/PendingRoomInvitationRequest";

export const pendingRoomInvitationRequestMockResponse: PendingRoomInvitationRequest[] =
  [
    {
      id: 1,
      roomCode: "WORK2",
      roomName: "Reunión de Trabajo",
      roomDescription: "Votaciones sobre el nuevo proyecto de la empresa",
      invitationDate: new Date("2024-06-01"),
      invitedUserId: 3, // Charlie invitado por Bob a sala de trabajo
    },
    {
      id: 2,
      roomCode: "BOOKCLUB",
      roomName: "Club de Lectura",
      roomDescription: "Discutimos sobre los libros que estamos leyendo",
      invitationDate: new Date("2024-06-05"),
      invitedUserId: 1, // Alice invitada por Ethan al club de lectura
    },
    {
      id: 3,
      roomCode: "GAMENIGHT",
      roomName: "Noche de Juegos",
      roomDescription: "Organizamos una noche de juegos de mesa",
      invitationDate: new Date("2024-06-10"),
      invitedUserId: 2, // Bob invitado por Fiona a la noche de juegos
    },
    {
      id: 4,
      roomCode: "COMMUNITY",
      roomName: "Reunión Comunitaria",
      roomDescription: "Discutimos temas de interés para la comunidad",
      invitationDate: new Date("2024-06-15"),
      invitedUserId: 3, // Charlie invitado por George a reunión comunitaria
    },
  ];
