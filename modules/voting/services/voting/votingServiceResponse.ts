import { BaseVoting } from "../../models/Voting";

export const BASE_VOTING_MOCK_RESPONSE: BaseVoting[] = [
  {
    id: 1,
    question: "¿Te gusta el helado?",
    description: "Votación rápida sobre preferencias de helado",
    owner: {
      id: 1,
      userName: "JuanPerez",
      email: "juan.perez@example.com",
      name: "Juan Perez",
    },
    status: "active",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseOnCreate",
    },
    type: "boolean",
  },
  {
    id: 2,
    question: "¿Cuál es tu color favorito?",
    description: "Elige entre varios colores populares",
    owner: {
      id: 2,
      userName: "MariaLopez",
      email: "maria.lopez@example.com",
      name: "Maria Lopez",
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
  },
  {
    id: 3,
    question: "¿Prefieres café o té?",
    description: "Votación sobre bebidas calientes",
    owner: {
      id: 3,
      userName: "CarlosGomez",
      email: "carlos.gomez@example.com",
      name: "Carlos Gomez",
    },
    status: "draft",
    close: {
      type: "manualClose",
    },
    release: {
      type: "manualRelease",
    },
    type: "boolean",
  },
  {
    id: 4,
    question: "¿Cuál es tu estación del año favorita?",
    description: "Votación sobre estaciones del año",
    owner: {
      id: 4,
      userName: "AnaMartinez",
      email: "ana.martinez@example.com",
      name: "Ana Martinez",
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
  },
  {
    id: 5,
    question: "¿Te gustaría trabajar desde casa?",
    description: "Votación sobre preferencias laborales",
    owner: {
      id: 5,
      userName: "LuisFernandez",
      email: "luis.fernandez@example.com",
      name: "Luis Fernandez",
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
  },
];
