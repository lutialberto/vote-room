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
];
