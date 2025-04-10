export enum VotingState {
  REGISTRATION = "REGISTRATION",
  PAIRING = "PAIRING",
  KEY_GENERATION = "KEY_GENERATION",
  VOTING = "VOTING",
  TALLYING = "TALLYING",
  RESULT = "RESULT",
}
export const VOTE_STATES: string[] = [
  VotingState.REGISTRATION,
  VotingState.VOTING,
  VotingState.RESULT,
];

export enum VotingSession {
  OPEN_VOTE = "OPEN_VOTE",
  VOTING_PHASE = "VOTING_PHASE",
  TALLYING = "TALLYING",
}
