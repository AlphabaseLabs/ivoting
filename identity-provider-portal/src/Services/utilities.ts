const Web3 = require("web3");
declare const window: any;
export const networkChainId = process.env.REACT_APP_ETH_NETWORK_CHAIN_ID || "";
export const getWeb3 = () => {
  try {
    return new Web3(Web3.givenProvider);
  } catch {
    throw new Error("Cannot connect to metamask");
  }
};
export const logOut = () => {
  window.location = "/";
};
