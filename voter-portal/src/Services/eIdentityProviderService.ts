/* eslint-disable no-undef */
// @ts-nocheck
import axios from "axios";
import {
  IDENTITY_PROVIDER_URL,
  RESIGTRATION_PROVIDER_URL,
} from "../Constants/apiUrls";

/**
 * Login function, will send username and password to the access provider backend
 * to get a token. This token is used later for getting a ETH wallet funded
 * @param username
 * @param password
 */
const headers = {
  "Content-Type": "application/json",
};
export const getToken = async (username, password) => {
  const requestBody = {
    identity: username,
    password: password,
  };
  console.log(requestBody);
  try {
    const res = await axios.post(`${IDENTITY_PROVIDER_URL}/auth`, requestBody, {
      headers,
    });
    console.log("res", res);
    return res.data.message;
  } catch (error) {
    console.log(error);
    throw new Error(`Login unsuccessful: ${error.response.data.message}`);
  }
};

export const resetPin = async (cnic) => {
  const requestBody = {
    identity: cnic,
  };
  try {
    const res = await axios.post(
      `${IDENTITY_PROVIDER_URL}/users/reset/password`,
      requestBody,
      {
        headers,
      }
    );
    console.log("res", res);
    // return res
  } catch (error) {
    console.log(error.response.data.message);
    let errorMsg = null;
    if (Array.isArray(error.response.data.message)) {
      errorMsg = error.response.data.message[0];
    } else {
      errorMsg = error.response.data.message;
    }

    throw new Error(errorMsg);
  }
};

export const getUserDetail = async () => {
  let token = sessionStorage.getItem("accessToken");
  headers["authorization"] = `Bearer ${token}`;

  try {
    // let res = await axios.get(`${RESIGTRATION_PROVIDER_URL}/users/details`, {
    //   headers,
    // });
    let res = await axios.get(`${process.env.REACT_APP_RESIGTRATION_PROVIDER_URL}/users/details`, {
      headers,
    });
    console.log(res.data);
    sessionStorage.setItem("uuid", res.data.uuid);

    return res.data;
  } catch (error) {
    console.log(error);

    // throw new Error(error);
  }
};
