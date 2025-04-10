import { VotingState } from "../Constants/enum";
import { GET_STATE } from "./types";

const initialState = {
  currentState: VotingState.REGISTRATION,
};

export default function (state = initialState, { type, payload }: any) {
  switch (type) {
    case GET_STATE:
      console.log("GET_STATE", payload);
      return {
        ...state,
        currentState: payload,
      };

    default:
      return state;
  }
}
