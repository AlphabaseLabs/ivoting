//@ts-nocheck
import axios from "axios";
import { DEV_URL, DEV_URL_2 } from "../Constants/apiUrls";
import retry from "retry";

const operation = retry.operation({
  retries: 5,
  factor: 3,
  minTimeout: 1 * 1000,
  maxTimeout: 60 * 1000,
  randomize: true,
});

declare const window: any;
const headers = {
  "Content-Type": "application/json",
};

export const tallyEncrypt = async (startTallyData) => {
  let data: any = JSON.stringify({
    election_id: startTallyData.election_id,
    tally_name: startTallyData.tally_name,
  });
  try {
    let res = await axios({
      method: "get",
      url: `${DEV_URL_2}/api/v1/tally/`,
      headers,
      params: {
        election_id: "pakistan_election22",
        tally_name: "pakistan_election-tally2",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Try later unable to compute tally");
  }
};

export const getContext = async () => {
  try {
    let res = await axios({
      method: "get",
      url: `${DEV_URL_2}/api/v1/election`,
      // headers,
      params: {
        election_id: process.env.REACT_APP_ELECTION_ID,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error, "ERROR FROM TALLY ENCRYPT");
    throw new Error("Try later unable to encrypt tally");
  }
};

export const keyCeremony = async () => {
  try {
    // operation.attempt(async (currentAttempt) => {
    let res = await axios({
      method: "get",
      url: `${DEV_URL_2}/api/v1/key/ceremony`,
      timeout: 1000 * 30,
      headers,
      params: {
        key_name: process.env.REACT_APP_KEY_NAME,
      },
    });

    return res.data;
    // });
  } catch (error) {
    console.log(error, "ERROR FROM KEY CEREMONY");
    throw new Error("Try later unable to compute tally");
  }
};

export const decryptShare = async (context, tally, guardianId) => {
  var data = JSON.stringify({
    guardian_id: process.env.REACT_APP_GUARDIAN_ID,
    context: context,
    encrypted_tally: tally,
  });
  try {
    let res = await axios({
      method: "post",
      timeout: 1000 * 30,
      url: `${DEV_URL}/api/v1/tally/decrypt-share`,
      headers,
      data,
    });

    return res.data;

    // return res.data;
  } catch (error) {
    console.log(error, "ERROR FROM Decrypt share");
    throw new Error("Try later unable to compute tally");
  }
};

export const submitTally = async (decryptData) => {
  var data = JSON.stringify({
    share: decryptData,
  });
  try {
    let res = await axios({
      method: "post",
      timeout: 1000 * 30,
      url: `${DEV_URL_2}/api/v1/tally/decrypt/submit-share`,
      headers,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error, "ERROR FROM KEY CEREMONY");
    throw new Error("Try later unable to compute tally.");
  }
};

export const tallyDecrpy = async (tallyData) => {
  var data = JSON.stringify({
    election_id: tallyData.election_id,
    tally_name: tallyData.tally_name,
  });
  try {
    let res = await axios({
      method: "post",
      timeout: 1000 * 30,
      url: `${DEV_URL_2}/api/v1/tally/decrypt?restart=true`,
      headers,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error, "ERROR FROM KEY CEREMONY");
    throw new Error("Please wait for all members to compute results.");
  }
};

export const startTally = async () => {
  var params = {
    election_id: process.env.REACT_APP_ELECTION_ID,
    tally_name: process.env.REACT_APP_TALLY_ID,
  };
  try {
    let res = await axios({
      method: "post",
      url: `${DEV_URL_2}/api/v1/tally`,
      headers,
      params,
    });
    return res.data;
  } catch (error) {
    console.log(error, "ERROR FROM KEY CEREMONY");
    throw new Error("Try later unable to start tally.");
  }
};
