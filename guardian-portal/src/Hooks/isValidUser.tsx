import { useEffect, useState } from "react";
import { getWeb3 } from "src/Services/loginServices";
import { networkChainId } from "../Services";

export const ValidUser = () => {
  const [isValid, setIsValid] = useState(false);

  const [loadingBasePrice, setLoadingBasePrice] = useState(false);
  const [basePrice, setBasePrice] = useState<string>("0");
  const [isConnected, setIsConnected] = useState(true);
  const [account, setAccount] = useState("");
  const [isRightNetwork, setIsRightNetwork] = useState(true);
  const [balance, setBalance] = useState("");
  const [hasSigned, setHasSigned] = useState(false);
  const [sign, setSign] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // checkMetaMask();
  }, [isConnected]);

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
        console.log("networkChainId", networkChainId, netId.toString());
        setIsRightNetwork(netId.toString() === networkChainId);
        if (netId.toString() === networkChainId) {
          await web3.eth.personal
            .sign("message to sign", accounts[0])
            .then((signature: string) => {
              setSign(signature);
            })
            .catch(() => setError("Please Sign first"));
        } else {
          setError("Please Connect to test network");
        }
      }
    } else {
      setIsConnected(false);
    }
  }

  const checkSign = async () => {
    if ((window as any)?.ethereum?.isConnected()) {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setIsConnected(false);
      } else {
      }
    }
  };
  //Listeners to account change, network change and lock account
  useEffect(() => {
    const web3 = getWeb3();
    if ((window as any).ethereum) {
      (window as any).ethereum.on("chainChanged", async () => {
        // logOut();
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
        // logOut();
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
        // logOut();
        console.log("metamask disconnect");
        setIsConnected(false);
      });

      (window as any).ethereum.on("connect", () => {
        console.log("metamask connected");
        setIsConnected(true);
      });
    }
  }, []);

  return [
    {
      isRightNetwork: isRightNetwork,
      balance: balance,
      isConnected: isConnected,
      account: account,
      basePrice: basePrice,
      loadingBasePrice: loadingBasePrice,
      hasSigned: hasSigned,
      sign: sign,
      checkSign: checkSign,
      checkMetaMask: checkMetaMask,
      error: error,
    },
  ];
};
