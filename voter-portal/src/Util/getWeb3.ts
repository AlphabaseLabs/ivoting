// const Web3 = require("web3");
import Web3 from "web3";
declare const window: any;

export const getWeb3 = () => {
  try {
    return new Web3(Web3.givenProvider);
  } catch {
    throw new Error("Cannot connect to metamask");
  }
};

export const getWeb3Node = (nodeUrl = process.env.REACT_APP_RPC_LINK || "") => {
  try {
    const provider = new Web3.providers.HttpProvider(nodeUrl);
    let web3 = new Web3(provider);
    return web3;
  } catch {
    throw new Error("Cannot connect to metamask");
  }
};
