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

  // Voting 6: "¿Qué juego elegimos para esta noche?" - ACTIVE - puede tener votos
  { id: 7, userId: 6, votingId: 6, votingOptionChoiceId: 12 }, // Fiona (owner) - Catan
  { id: 8, userId: 1, votingId: 6, votingOptionChoiceId: 13 }, // Alice - UNO
  { id: 9, userId: 3, votingId: 6, votingOptionChoiceId: 9 }, // Charlie - Monopoly
  { id: 10, userId: 9, votingId: 6, votingOptionChoiceId: 11 }, // Ivan - Risk

  // Voting 8: "¿Cuál es tu género cinematográfico favorito?" - ACTIVE - Helena con amigos
  { id: 11, userId: 8, votingId: 8, votingOptionChoiceId: 15 }, // Helena (owner) - Comedia
  { id: 12, userId: 3, votingId: 8, votingOptionChoiceId: 14 }, // Charlie - Acción
  { id: 13, userId: 6, votingId: 8, votingOptionChoiceId: 19 }, // Fiona - Romance

  // Voting 10: "¿Qué tecnología es más prometedora?" - ACTIVE - Ethan con desarrolladores
  { id: 14, userId: 5, votingId: 10, votingOptionChoiceId: 20 }, // Ethan (owner) - IA
  { id: 15, userId: 8, votingId: 10, votingOptionChoiceId: 22 }, // Helena - Realidad Virtual
  { id: 16, userId: 9, votingId: 10, votingOptionChoiceId: 20 }, // Ivan - IA
  { id: 17, userId: 11, votingId: 10, votingOptionChoiceId: 24 }, // Kevin - Computación Cuántica
  { id: 18, userId: 12, votingId: 10, votingOptionChoiceId: 21 }, // Leo - Blockchain

  // Voting 12: "¿Cuál es tu deporte favorito?" - CLOSED - Maria con grupo deportivo (agregar más votos)
  { id: 19, userId: 7, votingId: 12, votingOptionChoiceId: 25 }, // George - Fútbol
  { id: 20, userId: 14, votingId: 12, votingOptionChoiceId: 26 }, // Nicolas - Básquetbol
  { id: 21, userId: 15, votingId: 12, votingOptionChoiceId: 27 }, // Oscar - Tenis
  { id: 22, userId: 16, votingId: 12, votingOptionChoiceId: 28 }, // Paula - Natación
];
