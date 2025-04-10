import axios from "axios";
import { DEV_URL } from "../Helper/apiUrl";
import { connectToContract } from "./web3";
const web3 = require("web3");
const headers = {
  "Content-Type": "application/json",
};
declare const window: any;

export const approveVoter = async (id: number, body: any): Promise<any> => {
  console.log(body);

  await axios
    .patch(`${DEV_URL}/users/${id}/approve`, body, { headers })
    .then((res) => {
      console.log("HI");
      console.log(res);

      return res;
    })
    .catch((e) => {
      console.log(e.response.data.message);
      throw new Error(e.response.data.message);
    });
};

export const elections = (seats = []) => {
  console.log(seats);

  console.log(toHash(seats[0]), toHash(seats[1]));

  return [toHash(seats[0]), toHash(seats[1])];
};

export const voter_id = (id: string) => {
  return toHash(id || "38303-1223238-5");
};

export const toHash = (value: any) => {
  return web3.utils.keccak256(value);
};

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export const checkRegisterVoter = async (
  voterIdHash: string,
  electionsHash: string[]
) => {
  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let voterContract = await connectToContract(
      process.env.REACT_APP_ELECTION_CONTRACT_ADRESS
    );
    let account = accounts[0];
    let transactionPossible = await voterContract.methods
      .registerVoter(voterIdHash, electionsHash)
      .estimateGas({ from: account })
      .then(function (gasAmount: any) {
        console.log("return true");
        return true;
      })
      .catch(function (error: any) {
        // console.log("error", error);

        throw new Error("Reset Metamask or check if in correct voting state.");
      });

    return transactionPossible;
  } catch (error) {
    throw new Error("Reset Metamask or check if in correct voting state.");
  }
};

export const registerVoter = async (
  voterIdHash: string,
  electionsHash: string[]
) => {
  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let voterContract = await connectToContract(
      process.env.REACT_APP_ELECTION_CONTRACT_ADRESS
    );
    let account = accounts[0];
    let transactionPossible = await voterContract.methods
      .registerVoter(voterIdHash, electionsHash)
      .estimateGas({ from: account })
      .then(function (gasAmount: any) {
        return true;
      })
      .catch(function (error: any) {
        console.log("error", error);
        return false;
      });
    if (transactionPossible) {
      let result = await voterContract.methods
        .registerVoter(voterIdHash, electionsHash)
        .send({ from: account });
      console.log(result, "contract result");
      return result;
    } else {
      console.log(transactionPossible);

      return false;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
