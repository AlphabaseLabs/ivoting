import { GET_STATE } from "./types";
import https from "https";
import { DEV_URL } from "../Constants/apiUrls";
import { VotingState } from "../Constants/enum";
import axios, { AxiosResponse } from "axios";

interface StateResponse {
  state: VotingState;
  registeredSealers: number;
  requiredSealers: number;
}
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const getSystemState = () => async (dispatch: any) => {
  console.log("getSystemState is called");
  try {
    let state = await getState();
    console.log("getSystemState", state);
    dispatch({
      type: GET_STATE,
      payload: state,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getState = async () => {
  try {
    const response: any = await axios.post(
      `${DEV_URL}/state`,
      {},
      { httpsAgent: agent }
    );

    if (response.status === 201) {
      const newState: VotingState = response.data.state;
      console.log("newState in rootAction", newState);
      return newState;
    } else {
      throw new Error(
        `State cannot be updated. ${response.status}, ${JSON.stringify(
          response.data
        )}`
      );
    }
  } catch (error) {
    console.log("In rootAction. Error is: ", error);
    throw new Error(error);
  }
};
