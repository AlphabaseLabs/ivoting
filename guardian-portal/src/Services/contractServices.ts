import BN from "bn.js";
import { multiSigAbi } from "../contracts/multiSig";
import { electionAbi } from "../contracts/election";
import { connectToContract, getWeb3 } from "./loginServices";
import {
  electionContractAddress,
  multiSigContractAddress,
  portalId,
} from "./utilities";
import { preValidationSubmitPublicKey } from "./loginServices";

export const changeContractStatus = async (account: string | null) => {
  try {
    const web3 = getWeb3();
    const electionContract = await connectToContract(
      electionAbi,
      electionContractAddress
    );
    console.log("electionContract", electionContract);
    let gasAmount = await electionContract.methods
      .startTallying()
      .send({ from: account });
    console.log("gasAmount", gasAmount);
    // }
  } catch (e: any) {
    console.log(e, "ERRORRRR");
    return "User denied Transaction";
  }
};

export const startVotingInContract = async (account: string | null) => {
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

    let electionContractFn = await electionContract.methods
      .openBallot()
      .encodeABI();

    let getContractState = await electionContract.methods
      .getElectionStateString()
      .call();

    console.log(getContractState, "contract state");

    let publicKeyStatus;

    if (getContractState === "VOTING") {
      publicKeyStatus = "next_stage";
    } else {
      publicKeyStatus = await preValidationSubmitPublicKey(
        electionContractFn,
        account
      );
    }

    let txCount =
      (await multiSigContract.methods.transactionCount().call()) - 1;

    console.log(txCount, "txCount start voting");

    let gasAmount = await multiSigContract.methods
      .submitTransaction(
        electionContractAddress,
         0,
        electionContractFn
      )
      .estimateGas({ from: account });

    if (gasAmount) {
      console.log(gasAmount);
      if (publicKeyStatus === "submit_transaction") {
        let electionTx: any = await multiSigContract.methods
          .submitTransaction(
            electionContractAddress,
            0,
            electionContractFn
          )
          .send({ gas: gasAmount, gasPrice, value: 0, from: account });
        console.log("electionTx", electionTx);
        // return electionTx.transactionHash;
        return false;
      } else if (publicKeyStatus === "confirm_transaction") {
        const receipt = await multiSigContract.methods
          .confirmTransaction(txCount)
          .send({ gas: gasAmount, gasPrice, value: 0, from: account });
        console.log("receipt", receipt);
        return false;
      } else if (publicKeyStatus === "next_stage") {
        return true;
      }
    }
  } catch (e: Error) {
    console.log(e);
    // return "User denied Transaction";
    throw new Error(e.message);
  }
};

export const stopVotingInContract = async (account: string | null) => {
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

    let electionContractFn = await electionContract.methods
      .startTallying()
      .encodeABI();

    const getContractState = await electionContract.methods
      .getElectionStateString()
      .call();

    let contractStateStatus;

    if (getContractState === "TALLYING") {
      contractStateStatus = "next_stage";
    } else {
      contractStateStatus = await preValidationSubmitPublicKey(
        electionContractFn,
        account
      );
    }

    let txCount =
      (await multiSigContract.methods.transactionCount().call()) - 1;

    console.log(txCount, "txCount start tallying");

    let gasAmount = await multiSigContract.methods
      .submitTransaction(
        electionContractAddress,
        0,
        electionContractFn
      )
      .estimateGas({ from: account });
    if (gasAmount) {
      console.log(gasAmount);

      if (contractStateStatus === "submit_transaction") {
        let electionTx: any = await multiSigContract.methods
          .submitTransaction(
            electionContractAddress,
             0,
            electionContractFn
          )
          .send({ gas: gasAmount, gasPrice, value: 0, from: account });
        console.log("electionTx", electionTx);
        // return electionTx.transactionHash;
        return false;
      } else if (contractStateStatus === "confirm_transaction") {
        const receipt = await multiSigContract.methods
          .confirmTransaction(txCount)
          .send({ gas: gasAmount, gasPrice, value: 0, from: account });
        console.log("receipt", receipt);
        return false;
      } else if (contractStateStatus === "next_stage") {
        return true;
      }
    }
  } catch (e: Error) {
    console.log(e, "maybe out of gas");
    // return "User denied Transaction";
    throw new Error(e.message);
  }
};
