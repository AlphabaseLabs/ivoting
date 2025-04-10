import axios from "axios";
import { DEV_URL } from "../Helper/apiUrl";
import { connectToContract } from "./web3";
var voterContract: any;
const headers = {
  "Content-Type": "application/json",
};
export const hasRole = async (account: string) => {
  try {
    let newAccessControlcontract = await getAccessControlContract();
    console.log("newAccessControlcontract", newAccessControlcontract);

    let roleAdress = process.env.REACT_APP_ROLE;
    let role = await newAccessControlcontract.methods
      .hasRole(roleAdress, account)
      .call();
    console.log("hasRole", role);
    return role;
  } catch (error: any) {
    console.log(error.message);

    // throw new Error(error.message);
  }
};

export const getAccessControlContract = async () => {
  let accessControlAdress = await acessControl();

  let accessControlContract = await connectToContract(accessControlAdress);
  return accessControlContract;
};

export const acessControl = async () => {
  try {
    voterContract = await connectToContract(
      process.env.REACT_APP_ELECTION_CONTRACT_ADRESS
    );
    console.log("voterContract", voterContract);

    let adressForAcessControl = await voterContract.methods
      .AccessControl()
      .call();

    return adressForAcessControl;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const adminLogin = async (expiry: any, sign: string): Promise<any> => {
  const data = JSON.stringify({
    expiry: expiry,
    signature: sign,
  });
  console.log();

  await axios
    .post(`${DEV_URL}/auth/admin`, data, { headers })
    .then((result: any) => {
      sessionStorage.setItem("token", result.data.message.access_token);
    })
    .catch((error: any) => {
      console.log(error);

      throw new Error(error);
    });
};
