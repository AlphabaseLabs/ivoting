import axios, { AxiosResponse } from "axios";
import { DEV_URL } from "../Constants/apiUrls";

interface StateResponse {
  state: string;
  registeredSealers: number;
  requiredSealers: number;
}
interface PairingStateResponse {
  state: string;
  connectedSealers: number;
  signedUpSealers: number;
  requiredSealers: number;
  question: string;
}

interface KeyGenerationStateReponse {
  state: string;
  submittedKeyShares: number;
  requiredKeyShares: number;
  publicKey: number;
}

export const getRequiredValidators = async (): Promise<StateResponse> => {
  try {
    const res = await axios.get(`${DEV_URL}/state`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};
export const checkNumberOfAuthoritiesOnline =
  async (): Promise<PairingStateResponse> => {
    try {
      const response = await axios.get(`${DEV_URL}/state`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };

export const createVote = async (question: string): Promise<any> => {
  try {
    const response = await axios.post(`${DEV_URL}/deploy`, {
      question: question,
    });
    console.log(response.data.address);
    return response.data;
  } catch (error) {
    console.error(error.msg);
    // throw new Error(error.response.data.message);
  }
};

export const checkNumberOfSubmittedPublicKeyShares =
  async (): Promise<KeyGenerationStateReponse> => {
    try {
      const response = await axios.get(`${DEV_URL}/state`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
