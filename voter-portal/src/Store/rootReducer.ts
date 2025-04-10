import { LOCALES } from "../i18n";
import {
  SET_AUTHENTICATED,
  SET_TOKEN,
  IS_AUTHENTICATED,
  IS_TOKEN_SET,
  SET_BALLOT_ADDRESS,
  SET_CONNECTION_URL,
  SET_CONTRACT,
  SET_ACCOUNT,
  SET_CASTED_VOTE,
  CHANGE_SYSTEM_LANGUAGE,
} from "./types";

let prevLang = localStorage.getItem("systemLang");

const initialState = {
  systemLanguage: prevLang ? prevLang : LOCALES.ENGLISH,
  isAuthenticated: false,
  token: "",
  isTokenSet: false,
  wallet: "",
  account: "",
  contract: {},
  contractAddress: "",
  connectionNodeUrl: "",
  error: false,
  message: "",
  voteTx: {},
  url: "",
  isVoteCasted: false,
};

export default function (state = initialState, { type, payload }: any) {
  switch (type) {
    case CHANGE_SYSTEM_LANGUAGE:
      console.log("CHANGE_SYSTEM_LANGUAGE", payload);
      localStorage.setItem("systemLang", payload);
      return {
        ...state,
        systemLanguage: payload,
      };
    case SET_AUTHENTICATED:
      sessionStorage.setItem("authenticated", payload);
      return {
        ...state,
        isAuthenticated: payload,
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case SET_TOKEN:
      sessionStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
      };
    case IS_TOKEN_SET:
      return {
        ...state,
        isTokenSet: payload,
      };
    case SET_BALLOT_ADDRESS:
      console.info("SET_BALLOT_ADDRESS", payload);
      return {
        ...state,
        contractAddress: payload,
      };
    case SET_CONNECTION_URL:
      console.info("SET_CONNECTION_URL", payload);
      return {
        ...state,
        connectionNodeUrl: payload,
      };
    case SET_CONTRACT:
      console.info("SET_CONTRACT", payload);
      return {
        ...state,
        contract: payload,
      };
    case SET_ACCOUNT:
      console.info("SET_ACCOUNT", payload);
      return {
        ...state,
        account: payload,
      };
    case SET_CASTED_VOTE:
      console.info("SET_CASTED_VOTE", payload);
      return {
        ...state,
        voteTx: payload,
      };
    default:
      return state;
  }
}
