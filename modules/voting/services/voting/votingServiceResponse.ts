import QuickBooleanPoll from "../../new/models/QuickBooleanPoll";

export const QUICK_BOOLEAN_POLL_MOCK_RESPONSE: QuickBooleanPoll[] = [
  {
    id: 1,
    question: "¿Te gusta el helado?",
    description: "Votación rápida sobre preferencias de helado",
    owner: {
      id: 1,
      userName: "JuanPerez",
    },
    status: "active",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseOnCreate",
    },
  },
  {
    id: 2,
    question: "¿Cuál es tu color favorito?",
    description: "Elige entre varios colores populares",
    owner: {
      id: 2,
      userName: "MariaLopez",
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
  },
  {
    id: 3,
    question: "¿Prefieres café o té?",
    description: "Votación sobre bebidas calientes",
    owner: {
      id: 3,
      userName: "CarlosGomez",
    },
    status: "draft",
    close: {
      type: "manualClose",
    },
    release: {
      type: "manualRelease",
    },
  },
  {
    id: 4,
    question: "¿Cuál es tu estación del año favorita?",
    description: "Votación sobre estaciones del año",
    owner: {
      id: 4,
      userName: "AnaMartinez",
    },
    status: "closed",
    close: {
      type: "programmedClose",
      durationMinutes: 30,
    },
    release: {
      type: "releaseOnCreate",
    },
  },
  {
    id: 5,
    question: "¿Te gustaría trabajar desde casa?",
    description: "Votación sobre preferencias laborales",
    owner: {
      id: 5,
      userName: "LuisFernandez",
    },
    status: "draft",
    close: {
      type: "manualClose",
    },
    release: {
      type: "releaseScheduled",
      date: new Date(Date.now() + 7200 * 1000), // 2 hours from now
    },
  },
];
