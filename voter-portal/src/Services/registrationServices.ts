// @ts-nocheck
import axios from "axios";
import { RESIGTRATION_PROVIDER_URL } from "../Constants/apiUrls";
//
//
const headers = {
  "Content-Type": "application/json",
};

export const sendCode = async (
  phone_nr: string,
  pass_nr: string,
  cnic: string
) => {
  const data = JSON.stringify({
    phone_nr: phone_nr,
    passport_nr: pass_nr,
    national_identity: cnic,
  });
  let datatoSend = null;
  try {
    await axios
      .post(`${RESIGTRATION_PROVIDER_URL}/users`, data, {
        headers,
      })
      .then((res) => {
        console.info("Code Verified", res);
        datatoSend = res.data;
      })
      .catch((error) => {
        console.log(error.response.data);
        datatoSend = error;
      });
  } catch (error) {
    console.log(error);
    datatoSend = error;
    // throw new Error(error.response);
  }
  return datatoSend;
};

export const registerUser = async (
  userId: string,
  verification_code: string
) => {
  const requestBody = {
    user: userId,
    verification_code: verification_code,
  };
  console.log(requestBody);

  try {
    const res = await axios.patch(
      `${RESIGTRATION_PROVIDER_URL}/users/verify/phone`,
      requestBody
    );
    return res;
  } catch (error) {
    console.info("ERROR IS:", error);
    let errMsg = null;
    if (Array.isArray(error.response.data.message)) {
      errMsg = error.response.data.message[0];
    } else {
      errMsg = error.response.data.message;
    }
    throw new Error(errMsg);
  }
};
export const getSecurityQuestions = async () => {
  try {
    const res = await axios.get(`${RESIGTRATION_PROVIDER_URL}/questions`, {
      headers,
    });
    console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    return error;
  }
};
export const getLoginQuestions = async (uuid: string) => {
  const token = sessionStorage.getItem("loginToken");
  headers["authorization"] = `Bearer ${token}`;
  console.log(headers);

  try {
    const res = await axios.get(`${RESIGTRATION_PROVIDER_URL}/auth/questions`, {
      headers,
    });
    console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    return error;
  }
};

export const sendAnswers = async (userId: number, answers: any) => {
  const requestBody = {
    user: userId,
    answers: answers,
  };
  console.info(requestBody);
  try {
    const res = await axios.put(
      `${RESIGTRATION_PROVIDER_URL}/users/answers`,
      requestBody,
      {
        headers,
      }
    );
    console.info(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const sendLoginAnswers = async (userId: number, answers: any) => {
  const requestBody = {
    answers: answers,
  };
  console.info(requestBody);
  const token = sessionStorage.getItem("loginToken");
  headers["authorization"] = `Bearer ${token}`;
  try {
    const res = await axios.post(
      `${RESIGTRATION_PROVIDER_URL}/auth/answers`,
      requestBody,
      {
        headers,
      }
    );
    console.info(res.data);
    sessionStorage.setItem("accessToken", res.data.message.access_token);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const uploadImg = async (data: any) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  let voterId = sessionStorage.getItem("uuid") as string;
  const formData = new FormData();
  formData.append("selfie", data);
  formData.append("user", voterId);

  try {
    const res = await axios.put(
      `${RESIGTRATION_PROVIDER_URL}/users/uploads`,
      formData,
      {
        headers,
      }
    );
    console.info(res);
    return res.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const approveVoter = async (cnic: string | null) => {
  const requestBody = {
    cnic: cnic,
  };
  console.info(requestBody);

  try {
    const res = await axios.post(
      `${RESIGTRATION_PROVIDER_URL}/approvevoter`,
      requestBody
    );

    return res;
  } catch (error) {
    console.info(error);
    throw new Error(error.response.data.message);
  }
};
// function userId(userId: any): string | Blob {
//   throw new Error("Function not implemented.");
// }
