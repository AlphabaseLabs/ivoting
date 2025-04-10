import { getSessionStorage } from "~/services";

let userToken: any = getSessionStorage();

export const reqHeaders = {
  "Content-Type": "application/json",
  authorization: `Bearer ${userToken}`,
};
