import { Header } from "./Header";
import { createContext, useEffect, useState } from "react";
import {
  connectToContract,
  requestAccount,
  // marketplaceAddress,
  getWeb3,
  // marketplaceAbi,
  logOut,
} from "../../Services/loginServices";
import { networkChainId } from "../../Services";

interface AppContextProps {
  account: string | null;
  balance: string | null;
  isConnected: boolean;
  isRightNetwork: boolean;
  basePrice: string;
  loadingBasePrice: boolean;
}

export const AppContext = createContext<AppContextProps>({
  balance: null,
  isConnected: true,
  isRightNetwork: true,
  account: null,
  basePrice: "0",
  loadingBasePrice: false,
});
export const UseMainLayout: React.FC = ({ children }) => {
  const [loadingBasePrice, setLoadingBasePrice] = useState(false);
  const [basePrice, setBasePrice] = useState<string>("0");
  const [isConnected, setIsConnected] = useState(true);
  const [account, setAccount] = useState("");
  const [isRightNetwork, setIsRightNetwork] = useState(true);
  const [balance, setBalance] = useState("");

  // const fetchBasePrice = async () => {
  //   try {
  //     setLoadingBasePrice(true);
  //     const web3 = getWeb3();
  //     const account = await requestAccount();
  //     if (account) {
  //       const marketplaceContract = await connectToContract(
  //         marketplaceAbi,
  //         marketplaceAddress
  //       );
  //       const basePrice = await marketplaceContract.methods.basePrice().call();
  //       if (basePrice !== undefined) {
  //         setBasePrice(web3.utils.fromWei(basePrice));
  //       }
  //       setLoadingBasePrice(false);
  //     }
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };

  //Metamask
  //Fetching initial values of account, network and balance
  async function checkMetaMask() {
    if ((window as any)?.ethereum?.isConnected()) {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
        setAccount(accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance));
        const netId = await web3.eth.net.getId();
        setIsRightNetwork(netId.toString() === networkChainId);
      }
    } else {
      setIsConnected(false);
    }
  }
  useEffect(() => {
    checkMetaMask();
  }, [isConnected]);

  //Listeners to account change, network change and lock account
  useEffect(() => {
    const web3 = getWeb3();
    if ((window as any).ethereum) {
      (window as any).ethereum.on("chainChanged", async () => {
        logOut();
        const netId = await web3.eth.net.getId();
        setIsRightNetwork(netId.toString() === networkChainId);
        let accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        if (accounts.length === 0) {
          setIsConnected(false);
        } else {
          setIsConnected(true);
          let balance = await web3.eth.getBalance(accounts[0]);
          setBalance(web3.utils.fromWei(balance.toString()));
        }
      });
      (window as any).ethereum.on("accountsChanged", async () => {
        logOut();
        let accounts = await web3.eth.getAccounts();
        console.log("accounts", accounts);

        setAccount(accounts[0]);
        if (accounts.length === 0) {
          setIsConnected(false);
        } else {
          setIsConnected(true);
          let balance = await web3.eth.getBalance(accounts[0]);
          setBalance(web3.utils.fromWei(balance));
        }
      });

      (window as any).ethereum.on("disconnect", () => {
        logOut();
        console.log("metamask disconnect");
        setIsConnected(false);
      });

      (window as any).ethereum.on("connect", () => {
        console.log("metamask connected");
        setIsConnected(true);
      });
    }
  }, []);

  useEffect(() => {
    // fetchBasePrice();
  }, []);
  return (
    <AppContext.Provider
      value={{
        isRightNetwork,
        balance,
        isConnected,
        account,
        basePrice,
        loadingBasePrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
