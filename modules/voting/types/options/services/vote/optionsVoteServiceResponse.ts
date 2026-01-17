import { OptionsVote } from "../../models/OptionsVote";

export const OPTIONS_VOTE_MOCK_RESPONSE: OptionsVote[] = [
  // Voting 2: "¿Cuál es tu color favorito?" - SCHEDULED - NO debe tener votos aún

  // Voting 4: "¿Cuál es tu estación del año favorita?" - CLOSED - puede tener votos
  { id: 1, userId: 4, votingId: 4, votingOptionChoiceId: 5 }, // Diana (owner) - Primavera
  { id: 2, userId: 1, votingId: 4, votingOptionChoiceId: 6 }, // Alice - Verano
  { id: 3, userId: 2, votingId: 4, votingOptionChoiceId: 5 }, // Bob - Primavera
  { id: 4, userId: 3, votingId: 4, votingOptionChoiceId: 7 }, // Charlie - Otoño
  { id: 5, userId: 5, votingId: 4, votingOptionChoiceId: 6 }, // Ethan - Verano
  { id: 6, userId: 6, votingId: 4, votingOptionChoiceId: 8 }, // Fiona - Invierno
];
