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
    {
      id: 5,
      roomCode: "STUDY",
      roomName: "Grupo de Estudio",
      roomDescription: "Coordinamos sesiones de estudio para exámenes finales",
      invitationDate: new Date("2024-06-18"),
      invitedUserId: 6, // Fiona invitada por Bob al grupo de estudio
    },
    {
      id: 6,
      roomCode: "FITNESS",
      roomName: "Rutina de Ejercicios",
      roomDescription: "Decidimos los horarios y actividades del gimnasio",
      invitationDate: new Date("2024-06-20"),
      invitedUserId: 3, // Charlie invitado por Diana al gimnasio
    },
    {
      id: 7,
      roomCode: "TECH",
      roomName: "Meetup de Tecnología",
      roomDescription: "Discutimos las últimas tendencias en desarrollo",
      invitationDate: new Date("2024-06-22"),
      invitedUserId: 1, // Alice invitada por Ethan al meetup tech
    },
    {
      id: 8,
      roomCode: "ART",
      roomName: "Taller de Arte",
      roomDescription: "Elegimos los materiales para el próximo proyecto",
      invitationDate: new Date("2024-06-25"),
      invitedUserId: 7, // George invitado por Kevin al taller de arte
    },
    {
      id: 9,
      roomCode: "MUSIC",
      roomName: "Festival de Música",
      roomDescription: "Organizamos un evento musical para la universidad",
      invitationDate: new Date("2024-06-28"),
      invitedUserId: 4, // Diana invitada por Ivan al festival de música
    },
    {
      id: 10,
      roomCode: "ROOM1",
      roomName: "Votación Familiar",
      roomDescription: "Decidimos el destino de las vacaciones familiares",
      invitationDate: new Date("2024-07-02"),
      invitedUserId: 6, // Fiona invitada por Alice a la votación familiar
    },
    {
      id: 11,
      roomCode: "SPORTS",
      roomName: "Torneo de Fútbol",
      roomDescription: "Organizamos los equipos y horarios del torneo",
      invitationDate: new Date("2024-07-05"),
      invitedUserId: 8, // Helena invitada por Julia al torneo de fútbol
    },
    {
      id: 12,
      roomCode: "COOKING",
      roomName: "Clase de Cocina",
      roomDescription: "Decidimos el menú para el taller de cocina",
      invitationDate: new Date("2024-07-08"),
      invitedUserId: 6, // Fiona invitada por Alice a la clase de cocina
    },
  ];
