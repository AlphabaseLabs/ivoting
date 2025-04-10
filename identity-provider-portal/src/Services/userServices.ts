// @ts-nocheck
import axios from "axios";
import { DEV_URL } from "../Helper/apiUrl";
const token = sessionStorage.getItem("token");
const expiry = sessionStorage.getItem("expiry");

const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
};

export const getUserDetail = async (id: number): Promise<any> => {
  let dataToSend: any;

  await axios
    .get(`${DEV_URL}/users/${id}`, {
      headers,
    })
    .then((res) => {
      dataToSend = res.data;
    })
    .catch((e) => {
      console.log(e);
      dataToSend = null;
      throw new Error(e);
    });

  return dataToSend;
};

export const getUserImg = async (id: number) => {
  let userImg: any;
  await axios
    .get(`${DEV_URL}/users/${id}/uploads`, { headers })
    .then((res) => {
      userImg = res.data.message[0];
    })
    .catch((e) => {
      console.log(e);
      userImg = null;
    });
  return userImg;
};

export const getAnswers = async (id: number) => {
  let ques: any;
  await axios
    .get(`${DEV_URL}/users/${id}/answers`, { headers })
    .then((res) => {
      ques = res.data.message;
    })
    .catch((e) => {
      console.log(e);
      ques = null;
    });
  return ques;
};
export const checkExpiryToken = () => {
  let expiry = sessionStorage.getItem("expiry");
  var CURRENT_DATE = new Date();
  var EXPIRY_DATE = new Date(expiry * 1000);
  if (
    expiry == null &&
    expiry == "undefined" &&
    expiry == undefined &&
    CURRENT_DATE >= EXPIRY_DATE
  ) {
    // console.log("tokenExpired TRUE", expiry);
    return true;
  } else {
    // console.log("tokenExpired FALSE", expiry);
    return false;
  }
};
export const clearSessionStorage = () => {
  sessionStorage.removeItem("expiry");
  sessionStorage.removeItem("token");
};
export const validateSessionStorage = () => {
  let expiryDate = sessionStorage.getItem("expiry");
  let userToken = sessionStorage.getItem("token");
  if (
    userToken == "" ||
    userToken == null ||
    userToken == "undefined" ||
    userToken == undefined
  ) {
    return false;
  } else {
    return true;
  }
};
export const getSessionStorage = () => {
  // let expiryDate = sessionStorage.getItem("expiry");
  let userToken = sessionStorage.getItem("token");

  // let userToken = "jsbdusdfyy534g87gh";
  return userToken;
};
export const editElections = async (id: number, elections: any) => {
  let body = JSON.stringify({
    elections: elections,
  });
  console.log(body);
  let resp = null;
  await axios
    .patch(`${DEV_URL}/users/${id}/approve`, body, { headers })
    .then((res) => {
      resp = res.data.message;
      return resp;
    })
    .catch((e) => {
      resp = null;
    });
  return resp;
};
