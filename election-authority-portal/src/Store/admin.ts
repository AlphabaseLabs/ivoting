import { VotingState } from "../Constants/enum";
import create from "zustand";
import axios, { AxiosResponse } from "axios";
import https from "https";
import { DEV_URL } from "../Constants/apiUrls";
interface StateResponse {
  state: VotingState;
  registeredSealers: number;
  requiredSealers: number;
}
const headers = {
  "Content-type": "application/json",
};
export const [useVoteStateStore]: any = create((set, get) => ({
  state: VotingState.REGISTRATION,
  setState: (newState: VotingState): void =>
    set({
      state: newState,
    }),
  nextState: async (): Promise<void> => {
    try {
      // avoids ssl error with certificate
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      // there is no error handling here on purpose -> handle in calling component
      const response: AxiosResponse<StateResponse> = await axios.post(
        `${DEV_URL}/state`,
        {},
        { httpsAgent: agent }
      );
      console.log("ADMIN STATE:", response.data);

      if (response.status === 201) {
        const newState: VotingState = response.data.state;
        set({ state: newState });
      } else {
        // TODO: think of a way to improve the error handling if the request fails. The goal is that zustand can be used to update the state using a request to the voting-authority-backend. The problem is that we only want to update the state in the here if the BE has update it. Therefore, we need to wait for a successful state change request. What shall we do if the request is not successful? Wait, display ErrorSnackbar, and let the user re-try.
        throw new Error(
          `State cannot be updated. ${response.status}, ${JSON.stringify(
            response.data
          )}`
        );
      }
    } catch (error) {
      console.log("inside voting.ts, error", error);
      // TODO: rethrow the error -> higher level component should handle it. We don't want to handle it here. But maybe we could return a Promise instead? Or how do we enusre that we can catch it higher up?
      throw new Error(error);
    }
  },
}));
