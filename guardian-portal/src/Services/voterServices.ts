import axios from "axios";
import { electionAbi } from "../contracts/election";
import { DEV_URL, SERVICES_URL } from "../Constants/apiUrls";
import {
  changeContractStatus,
  startVotingInContract,
  stopVotingInContract,
} from "./contractServices";
import { connectToContract } from "./loginServices";
import { electionContractAddress, electionId } from "./utilities";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const getSystemStatus = async () => {
  let data: any = JSON.stringify({
    election_id: process.env.REACT_APP_ELECTION_ID,
    object_id: "abc",
  });

  try {
    let apiState: any = await axios.put(
      `${DEV_URL}/api/v1/manifest/get-status/`,
      data,
      { headers }
    );
    // let res = await axios({
    //   method: "put",
    //   url: `${DEV_URL}/api/v1/manifest/get-status`,
    //   headers,
    //   data,
    // });
    console.log(apiState, "STATUSSSSSSSSSSSSSSSSSSSSSSs");

    const electionContract = await connectToContract(
      electionAbi,
      electionContractAddress
    );
    let contractState = await electionContract.methods
      .getElectionStateString()
      .call();
    console.log("state from api is: ", apiState.data.status);
    console.log("state from contract is: ", contractState);
    if (apiState.data.status == "CLOSED" && contractState == "REGISTRATION")
      return "Registration";
    else if (apiState.data.status == "OPEN" && contractState == "VOTING")
      return "Voting";
    else if (apiState.data.status == "CLOSED" && contractState == "VOTING")
      return "Voting";
    else if (apiState.data.status == "CLOSED" && contractState == "TALLYING")
      return "Tallying";
    else return "Registration";
    // return state;

    // return status;
  } catch (error) {}
};

export const triggerTally = async () => {
  console.log("triggerTally");

  try {
    // let res: any = await axios.post(
    //   `${SERVICES_URL}/api/v1/tally?election_id=${electionId}&tally_name=pakistan-tally-1`,
    //   { headers }
    // );
    // console.log(res);
    return "res.data.election_id";
  } catch (error: any) {
    console.log(error);

    throw new Error(error.response.data);
  }
};

export const startVoting = async (account: string) => {
  try {
    let stateInApi: any = await axios.post(
      `${SERVICES_URL}/api/v1/election/open?election_id=${electionId}`,
      {
        headers,
      }
    );
    let stateInContract = await startVotingInContract(account);
    if (stateInContract) {
      return stateInApi.data.status;
    } else {
      throw new Error("Please wait for other guardians confirmation.");
    }
  } catch (error: Error) {
    throw new Error(error.message);
  }
};

export const stopVoting = async (account: string) => {
  try {
    let stateInApi: any = await axios.post(
      `${SERVICES_URL}/api/v1/election/close?election_id=${process.env.REACT_APP_ELECTION_ID}`,
      {
        headers,
      }
    );
    console.log(stateInApi.data);
    let changedState = await stopVotingInContract(account);
    if (changedState) {
      return stateInApi.data.status;
    } else {
      throw new Error("Please wait for other guardians confirmation.");
    }
  } catch (error: Error) {
    throw new Error(error.message);
  }
};
