import { BooleanVote } from "../../models/BooleanVote";

export const BOOLEAN_VOTE_MOCK_RESPONSE: BooleanVote[] = [
  // Voting 1: "¿Te gusta el helado?" - ACTIVE - puede tener votos
  { id: 1, userId: 1, votingId: 1, choice: true }, // Alice
  { id: 2, userId: 2, votingId: 1, choice: true }, // Bob
  { id: 3, userId: 3, votingId: 1, choice: false }, // Charlie
  { id: 4, userId: 4, votingId: 1, choice: true }, // Diana

  // Voting 3: "¿Prefieres café o té?" - DRAFT - NO debe tener votos aún
  // Voting 5: "¿Te gustaría trabajar desde casa?" - DRAFT - NO debe tener votos aún

  // Voting 11: "¿Te gusta la música electrónica?" - ACTIVE - Leo con amigos de música
  { id: 5, userId: 12, votingId: 11, choice: true }, // Leo (owner)
  { id: 6, userId: 9, votingId: 11, choice: false }, // Ivan
  { id: 7, userId: 8, votingId: 11, choice: true }, // Helena
  { id: 8, userId: 13, votingId: 11, choice: true }, // Maria

  // Voting 14: "¿Deberíamos organizar más eventos benéficos?" - ACTIVE - Charlie con voluntarios
  { id: 9, userId: 3, votingId: 14, choice: true }, // Charlie (owner)
  { id: 10, userId: 1, votingId: 14, choice: true }, // Alice
  { id: 11, userId: 4, votingId: 14, choice: false }, // Diana
  { id: 12, userId: 10, votingId: 14, choice: true }, // Julia
];
