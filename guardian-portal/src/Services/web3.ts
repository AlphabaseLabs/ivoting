import { multiSigAbi } from "../contracts/multiSig";
const Web3 = require("web3");
declare const window: any;

export const getWeb3 = () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("metamask is installed");
    return new Web3(window.ethereum);
  } else {
    window.ethereum.enable();
    console.log("metamask is not installed");
  }
};
export const connectToContract = async (adress: string | undefined) => {
  try {
    //@ts-ignore
    let web3 = getWeb3();
    return new web3.eth.Contract(multiSigAbi, adress);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
