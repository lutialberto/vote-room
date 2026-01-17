import { BooleanVotingRecord } from "../../models/BooleanVoting";

export const BOOLEAN_VOTING_SERVICE_RESPONSE_MOCK: BooleanVotingRecord[] = [
  {
    id: 1,
    baseVotingId: 1, // "¿Te gusta el helado?" - type: boolean
  },
  {
    id: 3,
    baseVotingId: 3, // "¿Prefieres café o té?" - type: boolean
  },
  {
    id: 5,
    baseVotingId: 5, // "¿Te gustaría trabajar desde casa?" - type: boolean
  },
];
