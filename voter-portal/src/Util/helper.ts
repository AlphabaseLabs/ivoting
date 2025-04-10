import axios from "axios";
import Web3 from "web3";

export const delay = (t: any) =>
  new Promise((resolve) => setTimeout(resolve, t));

const config = { headers: { "Content-Type": "application/json" } };

export const createAccountRPC = async (
  url: any,
  password: any,
  passphrase: any
) => {
  const body = {
    jsonrpc: "2.0",
    method: "personal_newAccount",
    params: [password],
    id: 0,
  };
  const response = await axios.post(url, body, config);
  if (response.data.error) {
    throw new Error(response.data.error.message);
  }
  return response.data.result;
  // var web3 = await getWeb3();
  // var userAccount = await web3.eth.accounts.create();
  // console.log(userAccount, "USER ACCOUNT DETAILS");
  // return userAccount;
};

export const createAccount = async (web3: Web3, connectionURL: string | undefined) => {
  try {
    const account = await web3.eth.personal.newAccount("securePassword");
    const unlockAccount = await web3.eth.personal.unlockAccount(
      account,
      "securePassword",
      60000
    );

    // const checkSigned = await web3.eth.personal.signTransaction(
    //   {
    //     from: account,
    //     gasPrice: "20000000000",
    //     gas: "21000",
    //     to: "0xe982E462b094850F12AF94d21D470e21bE9D0E9C",
    //     value: "0",
    //     data: "",
    //   },
    //   "securePassword"
    // );
    // let resUnlock = await unlockAccountRPC(
    //   connectionURL,
    //   "securePassword",
    //   account
    // );
    // console.log(checkSigned, "checkSigned");
    return account;
  } catch (error: any) {
    throw new Error(error.message? error.message : error);
  }
};

export const unlockAccountRPC = async (
  url: any,
  password: any,
  address: any,
  web3: any,
  account: any
) => {
  try {
    const unlockAccount = await web3.eth.personal.unlockAccount(
      account,
      password,
      6000
    );
    console.log(unlockAccount, "unlockUserAccountWeb3");
    return unlockAccount;
  } catch (error: any) {
    console.log(error);
  }

  // const body = {
  //   jsonrpc: "2.0",
  //   method: "personal_unlockAccount",
  //   params: [address, password, null],
  //   id: 0,
  // };
  // console.info(url, password, address);

  // const response = await axios.post(url, body, config);

  // if (response.data.error) {
  //   console.info("unlockAccountRPC", response.data.error.message);

  //   throw new Error(response.data.error.message);
  // } else {
  //   return address;
  // }
};
