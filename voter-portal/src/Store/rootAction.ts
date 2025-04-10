import {
  CHANGE_SYSTEM_LANGUAGE,
  IS_AUTHENTICATED,
  IS_TOKEN_SET,
  SET_ACCOUNT,
  SET_AUTHENTICATED,
  SET_BALLOT_ADDRESS,
  SET_CASTED_VOTE,
  SET_CONNECTION_URL,
  SET_CONTRACT,
  SET_TOKEN,
} from "./types";

export const changeSystemLanguage =
  (lang: string) => (dispatch: any, getState: any) => {
    dispatch({
      type: CHANGE_SYSTEM_LANGUAGE,
      payload: lang,
    });
  };

export const setAuthenticated =
  (flag: boolean) => (dispatch: any, getState: any) => {
    dispatch({
      type: SET_AUTHENTICATED,
      payload: flag,
    });
  };

export const getIsAuthenticated = () => (dispatch: any) => {
  let auth = sessionStorage.getItem("authenticated");
  if (auth !== "true" || auth === null) {
    dispatch({
      type: IS_AUTHENTICATED,
      payload: false,
    });
  } else {
    dispatch({
      type: IS_AUTHENTICATED,
      payload: true,
    });
  }
};
export const setToken = (token: string) => (dispatch: any) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};
export const getIsTokenSet = () => (dispatch: any) => {
  let token = sessionStorage.getItem("token");
  if (token === null || token == "") {
    dispatch({
      type: IS_TOKEN_SET,
      payload: false,
    });
  } else {
    dispatch({
      type: IS_TOKEN_SET,
      payload: true,
    });
  }
};

export const setBallotContractAddress =
  (address: string) => (dispatch: any) => {
    dispatch({
      type: SET_BALLOT_ADDRESS,
      payload: address,
    });
  };

export const setConnectionUrl = (url: string) => (dispatch: any) => {
  dispatch({
    type: SET_CONNECTION_URL,
    payload: url,
  });
};

export const setContract = (contract: any) => (dispatch: any) => {
  dispatch({
    type: SET_CONTRACT,
    payload: contract,
  });
};
export const setAccount = (account: string) => (dispatch: any) => {
  dispatch({
    type: SET_ACCOUNT,
    payload: account,
  });
};
export const setVoteCasted = (voteTx: any) => (dispatch: any) => {
  dispatch({
    type: SET_CASTED_VOTE,
    payload: voteTx,
  });
};
