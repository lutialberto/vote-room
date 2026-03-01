import { AwardMember } from "../../models/awardMember";

export const AWARD_MEMBER_MOCK_RESPONSE: AwardMember[] = [
  // Award 1: MMA Awards 2025,
  { id: 1, userId: 1, awardId: 1 }, // Alice (owner)
  { id: 2, userId: 2, awardId: 1 }, // Bob
  { id: 3, userId: 3, awardId: 1 }, // Charlie
  { id: 4, userId: 5, awardId: 1 }, // Ethan

  // Award 2: Grammy Awards 2025
  { id: 5, userId: 2, awardId: 2 }, // Bob (owner)
  { id: 6, userId: 1, awardId: 2 }, // Alice
  { id: 7, userId: 6, awardId: 2 }, // Fiona
  { id: 8, userId: 7, awardId: 2 }, // George
  { id: 9, userId: 8, awardId: 2 }, // Hannah

  // Award 3: Hollywood Awards 2025
  { id: 10, userId: 12, awardId: 3 }, // Laura (owner)
  { id: 11, userId: 5, awardId: 3 }, // Ethan
  { id: 12, userId: 7, awardId: 3 }, // George

  // Award 4: Tech Innovators Awards 2025
  { id: 18, userId: 9, awardId: 4 }, // Ian (owner)
  { id: 13, userId: 4, awardId: 4 }, // Diana
  { id: 14, userId: 2, awardId: 4 }, // Bob
  { id: 15, userId: 6, awardId: 4 }, // Fiona
  { id: 16, userId: 7, awardId: 4 }, // George
  { id: 17, userId: 1, awardId: 4 }, // Alice

  // Award 5: Remote Work Awards 2025
  { id: 19, userId: 19, awardId: 5 }, // Steve (owner)
  { id: 20, userId: 2, awardId: 5 }, // Bob
  { id: 21, userId: 6, awardId: 5 }, // Fiona
  { id: 22, userId: 8, awardId: 5 }, // Hannah
  { id: 23, userId: 9, awardId: 5 }, // Ian
];
