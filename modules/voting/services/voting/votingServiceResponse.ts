import { BaseVoting } from "../../models/Voting";

export const BASE_VOTING_MOCK_RESPONSE: BaseVoting[] = [
  {
    id: 1,
    question: "¿Te gusta el helado?",
    description: "Votación rápida sobre preferencias de helado",
    owner: {
      id: 1,
      userName: "Alice",
      type: "email",
    },
    status: "active",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "ROOM1",
  },
  {
    id: 2,
    question: "¿Cuál es tu color favorito?",
    description: "Elige entre varios colores populares",
    owner: {
      id: 2,
      userName: "Bob",
      type: "email",
    },
    status: "scheduled",
    close: {
      type: "programmedClose",
      durationMinutes: 60,
    },
    release: {
      type: "releaseScheduled",
      date: new Date(Date.now() + 3600 * 1000), // 1 hour from now
    },
    type: "options",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "WORK2",
  },
  {
    id: 3,
    question: "¿Prefieres café o té?",
    description: "Votación sobre bebidas calientes",
    owner: {
      id: 3,
      userName: "Charlie",
      type: "email",
    },
    status: "draft",
    close: {
      type: "manualClose",
    },
    release: {
      type: "manualRelease",
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "PARTY",
  },
  {
    id: 4,
    question: "¿Cuál es tu estación del año favorita?",
    description: "Votación sobre estaciones del año",
    owner: {
      id: 4,
      userName: "Diana",
      type: "email",
    },
    status: "closed",
    close: {
      type: "programmedClose",
      durationMinutes: 30,
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "options",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "TRIP",
  },
  {
    id: 5,
    question: "¿Te gustaría trabajar desde casa?",
    description: "Votación sobre preferencias laborales",
    owner: {
      id: 5,
      userName: "Ethan",
      type: "email",
    },
    status: "draft",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseScheduled",
      date: new Date(Date.now() + 7200 * 1000), // 2 hours from now
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "BOOKCLUB123",
  },
  {
    id: 6,
    question: "¿Qué juego elegimos para esta noche?",
    description: "Votación para decidir el juego de mesa de hoy",
    owner: {
      id: 6,
      userName: "Fiona",
      type: "email",
    },
    status: "active",
    close: {
      type: "programmedClose",
      durationMinutes: 45,
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "options",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "GAMENIGHT",
  },
  {
    id: 7,
    question: "¿Deberíamos implementar horario flexible?",
    description: "Decisión sobre políticas laborales de la empresa",
    owner: {
      id: 2,
      userName: "Bob",
      type: "email",
    },
    status: "scheduled",
    close: {
      type: "programmedClose",
      durationMinutes: 120,
    },
    release: {
      type: "releaseScheduled",
      date: new Date(Date.now() + 1800 * 1000), // 30 minutes from now
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "WORK2",
  },
  {
    id: 8,
    question: "¿Cuál es tu género cinematográfico favorito?",
    description: "Ayúdanos a elegir el tipo de película para ver",
    owner: {
      id: 8,
      userName: "Helena",
      type: "email",
    },
    status: "active",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "options",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "MOVIE",
  },
  {
    id: 9,
    question: "¿Prefieres entrenar por la mañana o por la tarde?",
    description: "Coordinamos los horarios del grupo de ejercicio",
    owner: {
      id: 4,
      userName: "Diana",
      type: "email",
    },
    status: "draft",
    close: {
      type: "manualClose",
    },
    release: {
      type: "manualRelease",
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "FITNESS",
  },
  {
    id: 10,
    question: "¿Qué tecnología es más prometedora?",
    description: "Debate sobre tendencias tecnológicas actuales",
    owner: {
      id: 5,
      userName: "Ethan",
      type: "email",
    },
    status: "active",
    close: {
      type: "programmedClose",
      durationMinutes: 90,
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "options",
    scope: {
      isPrivate: true,
      membersType: "authenticated",
    },
    roomCode: "TECH",
  },
  {
    id: 11,
    question: "¿Te gusta la música electrónica?",
    description: "Votación simple sin sala asociada",
    owner: {
      id: 12,
      userName: "Leo",
      type: "email",
    },
    status: "active",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
  },
  {
    id: 12,
    question: "¿Cuál es tu deporte favorito?",
    description: "Encuesta general sobre preferencias deportivas",
    owner: {
      id: 13,
      userName: "Maria",
      type: "email",
    },
    status: "closed",
    close: {
      type: "programmedClose",
      durationMinutes: 60,
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "options",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
  },
  {
    id: 13,
    question: "¿Qué técnica artística te interesa más?",
    description: "Decidimos el enfoque para el próximo taller",
    owner: {
      id: 11,
      userName: "Kevin",
      type: "email",
    },
    status: "scheduled",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseScheduled",
      date: new Date(Date.now() + 5400 * 1000), // 1.5 hours from now
    },
    type: "options",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "ART",
  },
  {
    id: 14,
    question: "¿Deberíamos organizar más eventos benéficos?",
    description: "Planificamos futuras actividades de voluntariado",
    owner: {
      id: 3,
      userName: "Charlie",
      type: "email",
    },
    status: "active",
    close: {
      type: "programmedClose",
      durationMinutes: 180,
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
    roomCode: "VOLUNTEER",
  },
  {
    id: 15,
    question: "¿Prefieres trabajar en equipo o individualmente?",
    description: "Encuesta sobre estilos de trabajo",
    owner: {
      id: 14,
      userName: "Nicolas",
      type: "email",
    },
    status: "draft",
    close: {
      type: "manualClose",
    },
    release: {
      type: "manualRelease",
    },
    type: "boolean",
    scope: {
      isPrivate: false,
      membersType: "unrestricted",
    },
  },
];
