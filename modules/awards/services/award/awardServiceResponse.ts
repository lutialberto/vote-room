import { Award } from "../../models/award";

export const awardServiceMockResponse: Award[] = [
  {
    id: 1,
    name: "MMA Awards 2025",
    description: "Premiación 2025 a los mejores peleadores de MMA.",
    tags: ["MMA", "deportes", "lucha"],
    awardDate: new Date("2024-12-15"),
    releaseDate: new Date("2024-12-20"),
    votingStage: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-10"),
    },
    owner: {
      id: 1,
      userName: "Alice",
      type: "email",
    },
  },
  {
    id: 2,
    name: "Grammy Awards 2025",
    description: "Premiación 2025 a los mejores artistas de la música.",
    tags: ["música", "entretenimiento", "artistas"],
    awardDate: new Date("2024-12-16"),
    releaseDate: new Date("2024-12-21"),
    votingStage: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-10"),
    },
    owner: {
      id: 2,
      userName: "Bob",
      type: "email",
    },
  },
  {
    id: 3,
    name: "Hollywood Awards 2025",
    description:
      "Premiación 2025 a los mejores actores y películas de Hollywood.",
    tags: ["cine", "entretenimiento", "actores", "películas"],
    awardDate: new Date("2024-12-16"),
    releaseDate: new Date("2024-12-21"),
    votingStage: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-10"),
    },
    owner: {
      id: 12,
      userName: "Laura",
      type: "email",
    },
  },
  {
    id: 4,
    name: "Tech Innovators Awards 2025",
    description:
      "Premiación 2025 a las empresas y personas más innovadoras en tecnología.",
    tags: ["tecnología", "innovación", "empresas", "personas"],
    awardDate: new Date("2024-12-17"),
    releaseDate: new Date("2024-12-22"),
    votingStage: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-10"),
    },
    owner: {
      id: 9,
      userName: "Ian",
      type: "email",
    },
  },
  {
    id: 5,
    name: "The Best 2025",
    description:
      "Premiación 2025 de los mejores jugadores y equipos de fútbol.",
    tags: ["fútbol", "deportes", "equipos", "jugadores"],
    awardDate: new Date("2024-12-18"),
    releaseDate: new Date("2024-12-23"),
    votingStage: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-10"),
    },
    owner: {
      id: 19,
      userName: "Steve",
      type: "email",
    },
  },
];
