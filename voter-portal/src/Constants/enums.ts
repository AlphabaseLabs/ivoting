export enum VotingState {
  REGISTRATION = "REGISTRATION",
  VERIFY_PHONE = "VERIFY_PHONE",
  UPLOAD_PICTURE = "UPLOAD_PICTURE",
  SECURITY_QUESTIONS = "SECURITY_QUESTIONS",
  REGISTRATION_REQ_SENT = "REGISTRATION_REQ_SENT",
  SIGN_IN = "SIGN_IN",
  VOTING_TIME = "VOTING_TIME",
  VOTING = "VOTING",
  VOTE_CASTED = "VOTE_CASTED",
  PAIRING = "PAIRING",
  KEY_GENERATION = "KEY_GENERATION",
  TALLYING = "TALLYING",
  RESULT = "RESULT",
}

export interface VoteTransaction {
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string;
  transactionHash: string;
  accepted: boolean;
}
export interface SystemLanguage {
  English: "ENGLISH";
  Urdu: "URDU";
}
