// @ts-nocheck
import axios from "axios";
import {
  ACCESS_PROVIDER_URL,
  electionContractAddress,
  electionId,
  MEDIATOR_URL,
  seedHash,
} from "../Constants/apiUrls";
import { getWeb3Node } from "../Util/getWeb3";
import ballotApi from "../Constants/Ballot.json";
import { electionAbi } from "../contracts/election";
// import { unlockAccountRPC } from "../Util/helper";
const token = sessionStorage.getItem("userToken");
const headers = {
  "Content-Type": "application/json",
};
// const Web3 = require("web3");

// Get Ballot from contract, Latest from 10th nov,21
export const getBallotDetails = async (
  constituency: string
): Promise<number> => {
  try {
    let ballotContract = await connectToContract(
      electionAbi,
      electionContractAddress
    );
    console.log("ballotContract", ballotContract);

    let candidates = await ballotContract.methods
      .getAllCandidatesInElecorialDistrict(constituency)
      .call();
    console.log(candidates, "BAllots");
    return candidates;
  } catch (error) {
    throw new Error("Cant get the ballot");
  }
};

export const getParty = async (party: string): Promise<number> => {
  try {
    let ballotContract = await connectToContract(
      electionAbi,
      electionContractAddress
    );
    let partyData = await ballotContract.methods.getParty(party).call();
    // console.log(partyData,"party data from ");
    
    return partyData;
  } catch (error) {
    throw new Error("The number of votes could not be assessed.");
  }
};

const connectToContract = async (contractAbi, ballotAdress: any) => {
  try {
    //@ts-ignore
    var web3 = await getWeb3Node();
    return new web3.eth.Contract(contractAbi, ballotAdress);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const encryptBallot = async (
  name: string,
  assembly: string,
  ballot: any,
  objectId: any
) => {
  console.log(ballot, "CONTRACT DATA");

  let objId = Math.floor(Math.random() * 100);
  let ballotId = "ballot" + objId;
  sessionStorage.setItem("ballot" + assembly, ballotId);

  let ballotSelection: any = [];
  for (var i = 0; i < ballot.length; i++) {
    ballotSelection.push({
      object_id: ballot[i].ballot_selections_object_id,
      // object_id: "NA",
      sequence_order: ballot[i].ballot_selections_sequence_order,
      vote: name == ballot[i].candidate_id ? 1 : 0,
    });
  }
  // console.log("ballotSelection", ballotSelection);

  let body = JSON.stringify({
    election_id: electionId,
    seed_hash: seedHash,
    ballots: [
      {
        contests: [
          {
            ballot_selections: ballotSelection,
            object_id: objectId,
          },
        ],
        object_id: ballotId,
        // style_id: ballot[0].electoral_district_id
        //   ? ballot[0].electoral_district_id
        //   : "islamabad",
        style_id: objectId,
      },
    ],
  });

  try {
    const res = await axios.post(
      `${MEDIATOR_URL}/api/v1/ballot/encrypt`,
      body,

      { headers }
    );
    console.log(res.data.encrypted_ballots);
    return res.data.encrypted_ballots;
  } catch (error) {
    console.log(error);

    throw new Error(
      `Something went wrong when sending ${wallet} to access provider to get the wallet funded. ${error.response.data.msg}`
    );
  }
};

export const sendCastVote = async (
  constituency: string,
  assembly: string,
  ballot: any
) => {
  console.log("hello in method");
  var Web3 = await getWeb3Node();

  let ballotKey = sessionStorage.getItem("ballot" + assembly);

  let body = JSON.stringify({
    election_id: electionId,
    ballots: ballot,
  });
  // let ballotKey = sessionStorage.getItem("ballot" + assembly);
  console.log("hello in api call");
  // console.log("BALLOTKEY",ballotKey);

  try {
    const res = await axios.post(`${MEDIATOR_URL}/api/v1/ballot/cast`, body, {
      headers,
    });
    console.log(res);

    // const userAddress = localStorage.getItem();

    if (res.statusText == "Accepted") {
      // console.log("hello in user account");

      // console.log(Web3.utils.isAddress(userAccount), "USER ACCOUNT");

      // let userContract = await electionContract.methods
      //   .getVoterState(Web3.utils.sha3(userId))
      //   .call();
      // console.log(userContract, "userContract");

      // let voterData = await electionContract.methods
      //   .getVoter(Web3.utils.sha3(userId))
      //   .call();

      // console.log(voterData, "VOTER DATA");

      // console.log(Web3.utils.sha3("NA-54"),"VOTER NA-54");
      // console.log(Web3.utils.sha3("NA-53"),"VOTER NA-53");

      // console.log(
      //   voterData.elections[0] === Web3.utils.sha3("NA-54"),
      //   "VOTER NA-54"
      // );
      // console.log(
      //   voterData.elections[1] === Web3.utils.sha3("NA-53"),
      //   "VOTER NA-53"
      // );

      // console.log(electionContract, "CONTRACT");
      // console.log(ballot, "ballot");
      // console.log("constituency: ", constituency)

      const userAccount = localStorage.getItem("userAccount");
      const electionContract = await connectToContract(
        electionAbi,
        process.env.REACT_APP_ELECTION_CONTRACT_ADRESS
      );
      let userId = sessionStorage.getItem("uuid").toString();

      const voteData = [
        userId,
        constituency,
        JSON.stringify(ballot),
        "ballotKey",
        "0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b",
      ];

      const voteDataHashed = [
        Web3.utils.sha3(userId),
        Web3.utils.sha3(constituency),
        Web3.utils.sha3(JSON.stringify(ballot)),
        "ballotKey",
        "0xbceab59162da5e511fb9c37fda207d443d05e438e5c843c57b2d5628580ce9216ffa0335834d8bb63d86fb42a8dd4d18f41bc3a301546e2c47aa1041c3a182371b",
      ];

      console.log(voteData);
      console.log(voteDataHashed);

      let txPossible = await electionContract.methods
        .castVote(...voteDataHashed)
        .estimateGas({
          from: Web3.utils.toChecksumAddress(userAccount),
        });
      console.log(txPossible, "POSSIBLE");
      if (txPossible) {
        console.log("hello in np estimate");

        const unlockAccount = await Web3.eth.personal.unlockAccount(
          userAccount,
          "securePassword",
          60000
        );
        console.log("unlockAccount: ", unlockAccount);

        let xx = await electionContract.methods
          .castVote(...voteDataHashed)
          .encodeABI();
        console.log(xx);
        let voteTx = await Web3.eth.sendTransaction(
          {
            nonce: await Web3.eth.getTransactionCount(userAccount),
            from: userAccount,
            gasPrice: "0",
            gas: "521000",
            to: process.env.REACT_APP_ELECTION_CONTRACT_ADRESS,
            value: "0x0",
            data: xx,
          },
          "securePassword!"
        );

        console.log(voteTx, "voteTx");
        if (voteTx) {
          sessionStorage.setItem("tx" + assembly, voteTx.transactionHash);
          return true;
        } else {
          return false;
        }
      } else {
        console.log("hello in bad estimation");

        return false;
      }
    }
  } catch (error: Error) {
    console.log(error, "CAST VOTE");
    return false;

    // throw new Error(
    //   `Something went wrong when sending ${wallet} to access provider to get the wallet funded. ${error.response.data.msg}`
    // );
  }
};

export const getBallotId = async (ballot: string) => {
  try {
    const res = await axios.get(
      `${MEDIATOR_URL}/api/v1/ballot?election_id=${electionId}&ballot_id=${ballot}`,
      { headers }
    );
    console.log(res);
    return res.data.ballots[0];
  } catch (error) {}
};

export const fetchResults = async () => {
  let body = JSON.stringify({
    election_id: process.env.REACT_APP_ELECTION_ID,
    tally_name: process.env.REACT_APP_TALLY_ID,
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_ACCESS_PROVIDER_URL}/api/v1/result/result`,
      body,
      { headers }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    return false;
  }
};
