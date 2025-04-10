import { parse } from "node:path";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import divHeader from "../../assets/ecpBorder.svg";
import getWeb3 from "../../helper/getWeb3";
import Header from "../Header/Header";
import Modal from "react-bootstrap/Modal";
import "./login.scss";
import { useHistory } from "react-router-dom";

const Web3 = require("web3");
declare const window: any;
function Login(props: any) {
  const history = useHistory();
  var web3: any;
  const getWeb3 = () => {
    if (typeof window.ethereum !== "undefined") {
      web3 = new Web3(window.ethereum);
      console.log("metamask is installed");
    } else {
      window.ethereum.enable();
      console.log("metamask is not installed");
    }
  };

  useEffect(() => {
    // if (typeof window.ethereum !== "undefined") {
    //   web3 = new Web3(window.ethereum);
    //   console.log("metamask is installed");
    // } else {
    //   window.ethereum.enable();
    //   console.log("metamask is not installed");
    // }
  }, []);
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let allowedAdmins = [
    "0x98b32c998f16e36cff94b430c656335d682e78dd",
    "0x6fd246b0D7076486822d55B93CCb26Ac7F08a11a",
  ];
  const handleLogin = async () => {
    getWeb3();
    setError("");
    const networkName = await web3.eth.net.getId().then((netId: number) => {
      switch (netId) {
        case 1:
          return "mainnet";
        case 2:
          return "deprecated Morden";
        case 3:
          return "ropsten";
        case 4:
          return "Rinkeby";
        case 42:
          return "Kovan";
        default:
          return "test";
      }
    });
    console.log("networkName", networkName);
    // if (networkName != "test") {
    //   setShow(true);
    // } else {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log("account from ethereum", account);
    //   web3.eth
    //     .getAccounts()
    //     .then((response: any) => {
    //       const publicAddressResponse = response[0];
    //       if (!(typeof publicAddressResponse === "undefined")) {
    //         console.log("account from web3", publicAddressResponse);
    //       }
    //     })
    //     .catch((e: any) => {
    //       console.error(e);
    //     });
    setAccount(account);
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });
    const read = parseInt(balance) / 10 ** 18;
    //   console.log(read.toFixed(5));
    setBalance(read.toFixed(5));
    let nonce = Math.floor(Math.random() * 100000000);
    let data = web3.eth.abi.encodeParameters(["string"], [nonce]);

    web3.eth.personal
      .sign("Please sign to continue", accounts[0])
      .then((signature: any) => {
        console.log("signature", signature);
        if (allowedAdmins.indexOf(account) !== -1) {
          console.log("he is allowed");
          history.push("/admin");
        } else {
          history.push("/admin");
          setError("Only lock contract owner is allowed to access this portal");
        }
      })
      .catch((err: any) => {
        console.log("err", err);
        setError("Signature request rejected by metamask");
      });
    // }
  };
  //   web3.version.getNetwork(() => {
  //     switch (netId) {
  //       case "1":
  //         console.log("This is mainnet");
  //         break;
  //       case "2":
  //         console.log("This is the deprecated Morden test network.");
  //         break;
  //       case "3":
  //         console.log("This is the ropsten test network.");
  //         break;
  //       default:
  //         console.log("This is an unknown network.");
  //     }
  //   });
  return (
    <>
      <Header />

      <div className="app-section flex-col-center  ">
        <div className="row flex-col-center w-100 g-0">
          <div className="col-6   flex-col-center ">
            <img src={divHeader} className="absolute-img d-none d-sm-block" />
          </div>
        </div>
        <div className="row flex-col-center w-100 no-gutters g-0">
          <div className="col-6">
            <div className="main-div flex-col-center">
              <div className="border-div w-75   mb-5 mt-5">
                <div className="circular-stepper-container w-100 flex-col-center ">
                  <h3 className="sub-heading my-4">Connect to metamask</h3>
                  <button
                    className="vote-btn hvr-shutter-in-horizontal"
                    onClick={handleLogin}
                  >
                    Connect
                  </button>
                  {error && (
                    <h3 className="sub-heading my-4" style={{ color: "red" }}>
                      {error}
                    </h3>
                  )}
                  {/* {!show && (
                    <div>
                      <h3 className="sub-heading my-4">{account}</h3>
                      <h3 className="sub-heading my-4">{balance}</h3>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Network</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Your wallet is connected to an unsupported network.
            <br /> Please connect it to the IVOTING network first.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
