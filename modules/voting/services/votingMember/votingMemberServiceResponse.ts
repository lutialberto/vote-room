import { VotingMember } from "../../models/VotingMember";

export const VOTING_MEMBER_MOCK_RESPONSE: VotingMember[] = [
  // Voting 1: "¿Te gusta el helado?" - ACTIVE - Alice con familia/amigos cercanos
  { id: 1, userId: 1, votingId: 1 }, // Alice (owner)
  { id: 2, userId: 2, votingId: 1 }, // Bob
  { id: 3, userId: 3, votingId: 1 }, // Charlie
  { id: 4, userId: 5, votingId: 1 }, // Ethan

  // Voting 2: "¿Cuál es tu color favorito?" - SCHEDULED - Bob con compañeros de trabajo
  { id: 5, userId: 2, votingId: 2 }, // Bob (owner)
  { id: 6, userId: 1, votingId: 2 }, // Alice
  { id: 7, userId: 6, votingId: 2 }, // Fiona
  { id: 8, userId: 7, votingId: 2 }, // George
  { id: 9, userId: 8, votingId: 2 }, // Hannah

  // Voting 3: "¿Prefieres café o té?" - DRAFT - Charlie con amigos del club de lectura
  { id: 10, userId: 3, votingId: 3 }, // Charlie (owner)
  { id: 11, userId: 5, votingId: 3 }, // Ethan
  { id: 12, userId: 7, votingId: 3 }, // George

  // Voting 4: "¿Cuál es tu estación del año favorita?" - CLOSED - Diana con grupo de viaje
  { id: 13, userId: 4, votingId: 4 }, // Diana (owner)
  { id: 14, userId: 2, votingId: 4 }, // Bob
  { id: 15, userId: 6, votingId: 4 }, // Fiona
  { id: 16, userId: 7, votingId: 4 }, // George
  { id: 17, userId: 1, votingId: 4 }, // Alice
  { id: 18, userId: 9, votingId: 4 }, // Ian

  // Voting 5: "¿Te gustaría trabajar desde casa?" - DRAFT - Ethan con compañeros de trabajo
  { id: 19, userId: 5, votingId: 5 }, // Ethan (owner)
  { id: 20, userId: 2, votingId: 5 }, // Bob
  { id: 21, userId: 6, votingId: 5 }, // Fiona
  { id: 22, userId: 8, votingId: 5 }, // Hannah
  { id: 23, userId: 9, votingId: 5 }, // Ian

  // Voting 11: "¿Te gusta la música electrónica?" - ACTIVE - Leo con amigos de música
  { id: 24, userId: 12, votingId: 11 }, // Leo (owner)
  { id: 25, userId: 9, votingId: 11 }, // Ivan
  { id: 26, userId: 8, votingId: 11 }, // Helena
  { id: 27, userId: 6, votingId: 11 }, // Fiona
  { id: 28, userId: 13, votingId: 11 }, // Maria
  { id: 29, userId: 11, votingId: 11 }, // Kevin

  // Voting 12: "¿Cuál es tu deporte favorito?" - CLOSED - Maria con grupo deportivo
  { id: 30, userId: 13, votingId: 12 }, // Maria (owner)
  { id: 31, userId: 10, votingId: 12 }, // Julia
  { id: 32, userId: 4, votingId: 12 }, // Diana
  { id: 33, userId: 7, votingId: 12 }, // George
  { id: 34, userId: 14, votingId: 12 }, // Nicolas
  { id: 35, userId: 15, votingId: 12 }, // Oscar
  { id: 36, userId: 16, votingId: 12 }, // Paula
  { id: 37, userId: 17, votingId: 12 }, // Roberto

  // Voting 15: "¿Prefieres trabajar en equipo o individualmente?" - DRAFT - Nicolas con colegas
  { id: 38, userId: 14, votingId: 15 }, // Nicolas (owner)
  { id: 39, userId: 2, votingId: 15 }, // Bob
  { id: 40, userId: 5, votingId: 15 }, // Ethan
  { id: 41, userId: 12, votingId: 15 }, // Leo
  { id: 42, userId: 18, votingId: 15 }, // Sofia
];
