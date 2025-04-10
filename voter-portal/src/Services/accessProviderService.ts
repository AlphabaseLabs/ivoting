// @ts-nocheck
import axios from "axios";
import {
  ACCESS_PROVIDER_URL,
  electionContractAddress,
  electionId,
  STATE_PROVIDER_URL,
} from "../Constants/apiUrls";
import { VotingState } from "../Constants/enums";
import { electionAbi } from "../contracts/election";
import { getWeb3Node as getWeb3 } from "../Util/getWeb3";
// const Web3 = require("web3");

// export const getWeb3 = () => {
//   try {
//     return new Web3(Web3.givenProvider);
//   } catch {
//     throw new Error("Cannot connect to metamask");
//   }
// };

export const connectToContract = async (contractAbi: any, adress: string) => {
  try {
    const web3 = getWeb3();
    return new web3.eth.Contract(contractAbi, adress);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSystemState = async () => {
  let data: any = JSON.stringify({
    election_id: electionId,
  });
  try {
    const electionContract = await connectToContract(
      electionAbi,
      electionContractAddress
    );
    let stateFromC = await electionContract.methods
      .getElectionStateString()
      .call();
    console.log("stateFromC", stateFromC);
    return stateFromC;
  } catch (error) {
    throw new Error(error);
  }
};
