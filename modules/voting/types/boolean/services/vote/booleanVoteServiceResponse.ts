import { BooleanVote } from "../../models/BooleanVote";

export const BOOLEAN_VOTE_MOCK_RESPONSE: BooleanVote[] = [
  // Voting 1: "¿Te gusta el helado?" - ACTIVE - puede tener votos
  { id: 1, userId: 1, votingId: 1, choice: true }, // Alice
  { id: 2, userId: 2, votingId: 1, choice: true }, // Bob
  { id: 3, userId: 3, votingId: 1, choice: false }, // Charlie
  { id: 4, userId: 4, votingId: 1, choice: true }, // Diana

  // Voting 3: "¿Prefieres café o té?" - DRAFT - NO debe tener votos aún
  // Voting 5: "¿Te gustaría trabajar desde casa?" - DRAFT - NO debe tener votos aún
];
