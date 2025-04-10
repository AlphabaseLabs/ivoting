import create from "zustand";

export const indexStore: any = create((set, get) => ({
  authenticated: false,
  token: "",
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
  setAuthenticated: (flag: boolean): void => {
    set({ authenticated: flag });
    sessionStorage.setItem("authenticated", flag.toString());
  },

  getIsAuthenticated: (): boolean => {
    let auth = sessionStorage.getItem("authenticated");
    if (auth != "true" || auth === null) {
      // return true;
      return false;
    } else {
      return true;
    }
  },
  setToken: (token: string): void => {
    set({ token: token });
    sessionStorage.setItem("token", token);
  },
  isTokenSet: (): boolean => {
    let token = sessionStorage.getItem("token");
    if (token === null || token == "") {
      //return true;
      return false;
    } else {
      return true;
    }
  },
  getToken: (): string | undefined | null => {
    let token = sessionStorage.getItem("token");
    if (token === null || token == "") {
      return null;
    } else {
      return token;
    }
  },
  setContract: (contract: any): void => {
    sessionStorage.setItem("contract", contract);
    set({ contract: contract });
  },
  getContract: (): any => {
    let contract = sessionStorage.getItem("contract");
    return contract;
  },
  isBallotContractAddressSet: (): boolean => {
    const address = sessionStorage.getItem("contractAddress");
    if (address === null || address === "") {
      return false;
    } else {
      return true;
    }
  },

  setBallotContractAddress: (address: string): void => {
    set({ contractAddress: address });
    sessionStorage.setItem("contractAddress", address);
  },

  setAccount: (account: any): void => {
    set({ account: account });
  },
  setConnectionUrl: (url: any): void => {
    set({ connectionNodeUrl: url });
  },
  setVoteTx: (voteTx: any): void => {
    // sessionStorage.setItem('vote',)
    set({ voteTx: voteTx });
  },
  isVoteTxSet: (): boolean => {
    let vote = sessionStorage.getItem("voteTx");

    if (vote === null || vote === "") {
      return false;
      // return true;
    } else {
      return true;
    }
  },
}));
