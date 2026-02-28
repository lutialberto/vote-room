import { PendingInvitationRequest } from "../models/PendingInvitationRequest";

export const pendingInvitationRequestMockResponse: PendingInvitationRequest[] =
  [
    {
      id: 1,
      entityId: "WORK2",
      entityType: "room",
      name: "Reunión de Trabajo",
      description: "Votaciones sobre el nuevo proyecto de la empresa",
      invitationDate: new Date("2024-06-01"),
      invitedUserId: 3, // Charlie invitado por Bob a sala de trabajo
    },
    {
      id: 2,
      entityId: "BOOKCLUB",
      entityType: "room",
      name: "Club de Lectura",
      description: "Discutimos sobre los libros que estamos leyendo",
      invitationDate: new Date("2024-06-05"),
      invitedUserId: 1, // Alice invitada por Ethan al club de lectura
    },
    {
      id: 3,
      entityId: "GAMENIGHT",
      entityType: "room",
      name: "Noche de Juegos",
      description: "Organizamos una noche de juegos de mesa",
      invitationDate: new Date("2024-06-10"),
      invitedUserId: 2, // Bob invitado por Fiona a la noche de juegos
    },
    {
      id: 4,
      entityId: "COMMUNITY",
      entityType: "room",
      name: "Reunión Comunitaria",
      description: "Discutimos temas de interés para la comunidad",
      invitationDate: new Date("2024-06-15"),
      invitedUserId: 3, // Charlie invitado por George a reunión comunitaria
    },
    {
      id: 5,
      entityId: "STUDY",
      entityType: "room",
      name: "Grupo de Estudio",
      description: "Coordinamos sesiones de estudio para exámenes finales",
      invitationDate: new Date("2024-06-18"),
      invitedUserId: 6, // Fiona invitada por Bob al grupo de estudio
    },
    {
      id: 6,
      entityId: "FITNESS",
      entityType: "room",
      name: "Rutina de Ejercicios",
      description: "Decidimos los horarios y actividades del gimnasio",
      invitationDate: new Date("2024-06-20"),
      invitedUserId: 3, // Charlie invitado por Diana al gimnasio
    },
    {
      id: 7,
      entityId: "TECH",
      entityType: "room",
      name: "Meetup de Tecnología",
      description: "Discutimos las últimas tendencias en desarrollo",
      invitationDate: new Date("2024-06-22"),
      invitedUserId: 1, // Alice invitada por Ethan al meetup tech
    },
    {
      id: 8,
      entityId: "ART",
      entityType: "room",
      name: "Taller de Arte",
      description: "Elegimos los materiales para el próximo proyecto",
      invitationDate: new Date("2024-06-25"),
      invitedUserId: 7, // George invitado por Kevin al taller de arte
    },
    {
      id: 9,
      entityId: "MUSIC",
      entityType: "room",
      name: "Festival de Música",
      description: "Organizamos un evento musical para la universidad",
      invitationDate: new Date("2024-06-28"),
      invitedUserId: 4, // Diana invitada por Ivan al festival de música
    },
    {
      id: 10,
      entityId: "ROOM1",
      entityType: "room",
      name: "Votación Familiar",
      description: "Decidimos el destino de las vacaciones familiares",
      invitationDate: new Date("2024-07-02"),
      invitedUserId: 6, // Fiona invitada por Alice a la votación familiar
    },
    {
      id: 11,
      entityId: "SPORTS",
      entityType: "room",
      name: "Torneo de Fútbol",
      description: "Organizamos los equipos y horarios del torneo",
      invitationDate: new Date("2024-07-05"),
      invitedUserId: 8, // Helena invitada por Julia al torneo de fútbol
    },
    {
      id: 12,
      entityId: "COOKING",
      entityType: "room",
      name: "Clase de Cocina",
      description: "Decidimos el menú para el taller de cocina",
      invitationDate: new Date("2024-07-08"),
      invitedUserId: 6, // Fiona invitada por Alice a la clase de cocina
    },
  ];
