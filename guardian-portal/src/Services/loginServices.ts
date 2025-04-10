//@ts-nocheck
import axios from "axios";
import { DEV_URL } from "../Constants/apiUrls";
import { jointKeyAbi } from "../contracts/jointKey";
import { multiSigAbi } from "../contracts/multiSig";
import { electionAbi } from "../contracts/election";
import { decrypt } from "../pages/DashboardMain/decrypt";

import BN from "bn.js";
import {
  electionContractAddress,
  multiSigContractAddress,
  portalId,
} from "./utilities";
import Web3 from "web3";
// const Web3 = require("web3");

declare const window: any;
const headers = {
  "Content-Type": "application/json",
};

export const getWeb3 = () => {
  try {
    return new Web3(Web3.givenProvider);
  } catch {
    throw new Error("Cannot connect to metamask");
  }
};

export const requestAccount = async (): Promise<string> => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (e) {
      console.log("meta ,mask error", e);
      throw new Error("Please verify if you have meta mask");
    }
  } else {
    throw new Error("Please verify if you have meta mask");
  }
};

export const getChainId = async (): Promise<number | null> => {
  try {
    const chainId = await getWeb3().eth.net.getId();
    return chainId;
  } catch (e) {
    console.log("getChainId error", e);
    throw new Error("Cannot connect to the network");
  }
};

export const connectToContract = async (contractAbi: any, adress: string) => {
  try {
    const web3 = getWeb3();

    return new web3.eth.Contract(contractAbi, adress);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const checkGetPublicKey = async (electionContract) => {
  try {
    let res = await electionContract.methods.getPublicKey().call();
    console.log(res, "public key get successful");
    return true;
  } catch (error) {
    console.log(error, "error getPublicKey");
    return false;
  }
};

export const preValidationSubmitPublicKey = async (funcEncodedAbi, account) => {
  try {
    const web3 = getWeb3();
    // const gasPrice = await web3.eth.getGasPrice();
    const multiSigContract = await connectToContract(
      multiSigAbi,
      multiSigContractAddress
    );
    
    console.log("before get public key");

    // let getPuclicKeyContract = await checkGetPublicKey(electionContract);

    // console.log("getPublickeyContract", getPuclicKeyContract);

    // if (getPuclicKeyContract) {
    //   //Move to next stage
    //   console.log("Move to next stage");
    //   return "next_stage";
    // } else {
    // let txCount =
    //   (await multiSigContract.methods
    //     .getTransactionCount(true, false)
    //     .call()) - 1;
    let txCount =
      (await multiSigContract.methods.transactionCount().call()) - 1;

    console.log(txCount, "txCount");
    console.log(process.env.REACT_APP_GUARDIAN_ID, "guardianID");
    if (txCount < 0 && process.env.REACT_APP_GUARDIAN_ID === "9014") {
      //Submit Transaction
      console.log("Submit Transaction");
      return "submit_transaction";
    } else {
      let txData = await multiSigContract.methods.transactions(txCount).call();
      console.log(txData, "TXDATA");
      console.log(funcEncodedAbi, "FUNCDATA");
      if (txData.data === funcEncodedAbi) {
        console.log("txData and duncAbi is equal");

        //confirm Transaction
        let checkConfirmation = await multiSigContract.methods
          .confirmations(txCount, account)
          .call();
        console.log(checkConfirmation, "checkConfirmation");
        if (checkConfirmation) {
          throw new Error(
            "You have already confirmed. Please wait for others to confirm."
          );
        } else {
          console.log("Confirm Transaction");
          return "confirm_transaction";
        }
      } else {
        if (process.env.REACT_APP_GUARDIAN_ID === "9014") {
          //Submit Transsaction
          console.log("Submit Transaction");
          return "submit_transaction";
        } else {
          //Wait for Submit Transaction
          console.log("Wait for Submit Transaction");
          throw new Error("Please wait for the other guardians.");
        }
      }
    }
    // }

    console.log(getPuclicKeyContract, "publicc keyyy");
  } catch (e: any) {
    // console.log(e);
    let msg = e.message;
    throw new Error(msg);
  }
};

export const submitPublicKey = async (
  public_key: any,
  account: string | null
) => {
  try {
    const web3 = getWeb3();
    const gasPrice = await web3.eth.getGasPrice();
    const multiSigContract = await connectToContract(
      multiSigAbi,
      multiSigContractAddress
    );

    const electionContract = await connectToContract(
      electionAbi,
      electionContractAddress
    );

    console.log("electionContract", electionContract);
    console.log("multiSigContract", multiSigContract);

    let multisigContractFn = await electionContract.methods
      .setPublicKey("0x" + public_key)
      .encodeABI();

    console.log("multiSigContract encodeABI", multiSigContract);

    let getPuclicKeyContract = await checkGetPublicKey(electionContract);

    console.log("getPublickeyContract", getPuclicKeyContract);

    let publicKeyStatus;

    if (getPuclicKeyContract) {
      publicKeyStatus = "next_stage";
    } else {
      publicKeyStatus = await preValidationSubmitPublicKey(
        multisigContractFn,
        account
      );
    }

    let gasAmount = await multiSigContract.methods
      .submitTransaction(electionContractAddress, 0, multisigContractFn)
      .estimateGas({ from: account });

    if (gasAmount) {
      console.log(gasAmount, "gasAmount");
      // let txCount =
      //   (await multiSigContract.methods
      //     .getTransactionCount(true, true)
      //     .call()) - 1;

      let txCount =
        (await multiSigContract.methods.transactionCount().call()) - 1;

      if (publicKeyStatus === "submit_transaction") {
        console.log("submittinggggggggggggggggg");

        let electionTx: any = await multiSigContract.methods
          .submitTransaction(
            electionContractAddress,
            txCount > -1 ? txCount : 0,
            multisigContractFn
          )
          .send({ gas: gasAmount, gasPrice, value: 0, from: account });

        console.log("electionTx", electionTx);

        // return electionTx.transactionHash;
        return false;
      } else if (publicKeyStatus === "confirm_transaction") {
        console.log("confirmmingggg");
        const receipt = await multiSigContract.methods
          .confirmTransaction(txCount)
          .send({ gas: gasAmount, gasPrice, value: 0, from: account });
        console.log("receipt", receipt);
        return false;
      } else if (publicKeyStatus === "next_stage") {
        return true;
      }

      // if (portalId == 1) {
      //   let electionTx: any = await multiSigContract.methods
      //     .submitTransaction(electionContractAddress, 0, multisigContractFn)
      //     .send({ gas: gasAmount, gasPrice, value: 0, from: account });

      //   console.log("electionTx", electionTx);

      //   return electionTx.transactionHash;
      // } else {
      //   console.log("portalId", portalId);

      //   const receipt = await multiSigContract.methods
      //     .confirmTransaction(new BN(0))
      //     .send({ gas: gasAmount, gasPrice, value: 0, from: account });
      //   console.log("receipt", receipt);
      // }
    } else {
      throw new Error("Insufficent");
    }
  } catch (e: Error) {
    // console.log(e);
    let msg = e.message;
    throw new Error(msg);
  }
};

export const isOwner = async (account: string) => {
  let multiSigContract: any;
  try {
    multiSigContract = await connectToContract(
      multiSigAbi,
      multiSigContractAddress
    );
    let owner = await multiSigContract.methods.isOwner(account).call();
    return owner;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSignedMessageAndTimeStamp = async (
  account: string
): Promise<{ signature: string | null; timestamp: number | null }> => {
  const timestamp = Math.floor(Date.now() / 1000);
  const messageToSign = `Welcome To The iVoting guardian panel.\nYou're trying to login @ ${timestamp}`;
  const web3 = getWeb3();
  return await web3.eth.personal
    .sign(messageToSign, account)
    .then(async (signature: any) => {
      return { signature, timestamp };
    })
    .catch(() => {
      throw new Error("Signature Denied");
    });
};

export const logOut = async (): Promise<void> => {
  if (window?.location?.pathname !== "/") {
    window.location = "/";
  }
};

export const getContests = async (type: string) => {
  let data: any = JSON.stringify({
    election_id: process.env.REACT_APP_ELECTION_ID,
    type: type,
  });

  try {
    let res = await axios.post(
      `${DEV_URL}/api/v1/manifest/get-contests`,
      data,
      { headers }
    );
    // console.log(res);
    return res.data;
  } catch (error) {}
};

export const getResult = async (decryptedTally) => {
  // let data: any = JSON.stringify({ tally: decryptedTally });
  let data: any = JSON.stringify({
    election_id: process.env.REACT_APP_ELECTION_ID,
    tally_name: process.env.REACT_APP_TALLY_ID,
  });
  console.log(decrypt);

  try {
    let res = await axios.post(`${DEV_URL}/api/v1/result/result`, data, {
      headers,
    });
    // console.log(res,"GET RESULT");
    return res.data;
  } catch (error) {}
};

export const getCandidates = async (id: string) => {
  let data: any = JSON.stringify({
    election_id: process.env.REACT_APP_ELECTION_ID,
    object_id: id,
  });

  try {
    let res = await axios.post(
      `${DEV_URL}/api/v1/manifest/get-candidates`,
      data,
      { headers }
    );
    return res.data;
  } catch (error) {}
};
export const getGuardians = async (id: string) => {
  let data: any = JSON.stringify({
    election_id: process.env.REACT_APP_ELECTION_ID,
    object_id: id,
  });

  try {
    let res = await axios.get(`${DEV_URL}/api/v1/guardian_/get-guardian`, {
      headers,
    });
    return res.data;
  } catch (error) {}
};
