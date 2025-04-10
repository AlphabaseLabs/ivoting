import { useEffect } from "react";
import { useState } from "react";
import {
  checkExpiryToken,
  clearSessionStorage,
} from "../Services/userServices";
import { useInterval } from "./UseInterval";

export const ValidateExpiryToken = () => {
  const [tokenExpired, setIsTokenExpired] = useState(false);
  const tokenExpireyCheckingFunction = () => {
    let expiryToken = checkExpiryToken();
    if (expiryToken) {
      // console.log(
      //   "we are setting token as expired because token is expired",
      //   expiryToken
      // );

      setIsTokenExpired(true);
      // clearSessionStorage();
    } else {
      // console.log(
      //   "we are not setting token as expired because token is expired",
      //   expiryToken
      // );
      setIsTokenExpired(false);
    }
  };
  useEffect(() => {
    tokenExpireyCheckingFunction();
  });
  useInterval(() => {
    tokenExpireyCheckingFunction();
  }, 4000);
  return tokenExpired;
};
