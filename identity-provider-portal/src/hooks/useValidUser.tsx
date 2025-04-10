import { useEffect, useState } from "react";
import { validateSessionStorage } from "../Services/userServices";

export const ValidUser = () => {
  const [isValid, setIsValid] = useState(true);
  const checkUserValidity = async () => {
    let validUser = await validateSessionStorage();

    if (validUser) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  useEffect(() => {
    checkUserValidity();
  }, []);

  return isValid;
};
