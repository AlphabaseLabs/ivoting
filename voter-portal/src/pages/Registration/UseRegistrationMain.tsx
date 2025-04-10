// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  registerUser,
  sendCode,
  uploadImg,
} from "../../Services/registrationServices";
import { getToken } from "../../Services/eIdentityProviderService";
import imageCompression from "browser-image-compression";
import translate from "../../i18n/translate";
// import { createAccountRPC, unlockAccountRPC } from "../../Util/helper";
// import { registerUser, sendCode } from "../../Services/registrationServices";
import { createAccount } from "../../Util/helper";
import { getWeb3Node } from "../../Util/getWeb3";

const options = {
  maxSizeMB: 5,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export default function UseRegistrationMain(
  stepsRoute: any,
  mainRoute: string
) {
  interface State {
    cnic: any;
    passport: any;
    phone: any;
  }
  interface QState {
    ans1: string;
    ans2: string;
  }
  interface IError {
    cnicError: boolean;
    passportError: boolean;
    phoneError: boolean;
    vCodeError: boolean;
  }
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [loginErrMsg, setLoginErrMsg] = useState<any>("");
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userImgFile, setUserImgFile] = useState<any>(null);
  const [displayImg, setDisplayImg] = useState<any>(null);

  const [fileError, setfileError] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsgImg, setErrorMsgImg] = useState<any>("");
  const [verCode, setVerCode] = useState("");
  const [verCodeError, setVerCodeError] = useState<boolean>(false);

  const [loginPin, setLoginPin] = useState("");
  const [loginPinError, setLoginPinError] = useState<boolean>(false);
  const inputFile = useRef<HTMLInputElement>(null);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  useEffect(() => {
    stepsRoute.map((val: string, index: number) => {
      if (val === query.get("step")) {
        setActiveStep(index);
      }
    });
  }, [query]);

  const [{ cnic, passport, phone }, setState] = useState<State>({
    cnic: "",
    passport: "",
    phone: "",
  });
  const [{ ans1, ans2 }, setAns] = useState<QState>({
    ans1: "",
    ans2: "",
  });

  useEffect(() => {
    let cnic = sessionStorage.getItem("userCnic");
    let phone = sessionStorage.getItem("userPhone");
    let passport = sessionStorage.getItem("userPassport");
    let vCode: any = sessionStorage.getItem("vCode");
    let ans1: any = sessionStorage.getItem("ans1");
    let ans1Value = JSON.parse(ans1);
    let ans2: any = sessionStorage.getItem("ans2");
    let ans2Value = JSON.parse(ans2);

    // setState({
    //   cnic: cnic,
    //   phone: phone,
    //   passport: passport,
    // });
    // setVerCode(vCode);
    setErrorMsg("");
    setError({
      cnicError: false,
      passportError: false,
      phoneError: false,
      vCodeError: false,
    });
    // if (ans1Value != null && ans2Value != null) {
    //   setAns({
    //     ans1: "",
    //     ans2: "",
    //   });
    // }
    setErrorMsgImg("");
    setLoginErrMsg("");
  }, [activeStep]);

  const [{ cnicError, passportError, phoneError, vCodeError }, setError] =
    useState<any>({
      cnicError: false,
      passportError: false,
      phoneError: false,
      vCodeError: false,
    });
  const handleNext = (stepNumber: number) => {
    if (mainRoute == "Register" && stepNumber > 5) {
      sessionStorage.clear();
      //window.location.href = "/Register";
      history.push("/Register");
      setState({
        cnic: "",
        passport: "",
        phone: "",
      });
      setVerCode("");
      setLoading(false);
    } else if (mainRoute == "SignIn" && stepNumber == 3) {
      // createUserAccount();
      creatingUserAccount();

      history.push("/Voting");
      setActiveStep(0);
    } else {
      history.push("/" + mainRoute + "?step=" + stepsRoute[stepNumber]);
      setActiveStep(stepNumber);
    }
  };

  async function creatingUserAccount() {
    let web3 = await getWeb3Node(process.env.REACT_APP_RPC_LINK);
    // let web3 = await getWeb3Node("https://mainnet.marvellex.com/rpc");
    let accountDetails = await createAccount(
      web3,
      process.env.REACT_APP_RPC_LINK
    );
    console.log(accountDetails, "ACCOUNT DETAILSSS");

    localStorage.setItem("userAccount", accountDetails);
    console.log(accountDetails, "ACCOUNT DETAILS USER");
  }

  // const createUserAccount = async () => {
  //   let accountDetails = await createAccountRPC(
  //     process.env.REACT_APP_RPC_LINK,
  //     "Abc123.",
  //     "Abc123."
  //   );
  //   let accountAddress = unlockAccountRPC(
  //     process.env.REACT_APP_RPC_LINK,
  //     "Abc123.",
  //     accountDetails.account
  //   );
  //   sessionStorage.setItem("address", accountAddress);
  // };

  const handleBack = () => {
    history.push("/" + mainRoute + "?step=" + stepsRoute[activeStep - 1]);
    setLoading(false);
    setActiveStep(activeStep - 1);
  };
  async function verifyPhone(e: any) {
    if (e) {
      e.preventDefault();
    }
    if (
      cnic == "" ||
      cnic == null ||
      !cnic.match(/^[0-9]{5}-[0-9]{7}-[0-9]$/)
    ) {
      setError({
        cnicError: true,
        passportError: false,
        phoneError: false,
        vCodeError: false,
      });
    } else if (
      passport == "" ||
      passport == null ||
      !passport.match(/^[A-Z0-9]+$/) ||
      passport.length !== 9
    ) {
      console.log("passport error thrown");

      setError({
        cnicError: false,
        passportError: true,
        phoneError: false,
        vCodeError: false,
      });
    } else if (
      phone === "" ||
      phone == null ||
      !phone.match(/^[0-9]{4}-[0-9]{7}$/)
    ) {
      setError({
        cnicError: false,
        passportError: false,
        phoneError: true,
        vCodeError: false,
      });
    } else {
      let final_phone = phone.replace("-", "");
      let phone_nr = "+92" + final_phone.substring(1, final_phone.length);
      const phoneUtil_phone = phoneUtil.parse(phone_nr);
      const valid = phoneUtil.isValidNumberForRegion(phoneUtil_phone, "PK");
      if (valid) {
        setLoading(true);
        setCodeSent(true);
        try {
          const res = await sendCode(phone_nr, passport, cnic);
          sessionStorage.setItem("userCnic", cnic);
          sessionStorage.setItem("userPassport", passport);
          sessionStorage.setItem("userPhone", phone);
          sessionStorage.setItem("uuid", res.message.uuid);
          sessionStorage.setItem("status", res.message.status);

          setCodeSent(true);
          setLoading(false);
          console.log(res.message.status);
          let userStatus = res.message.status;
          if (userStatus == "PENDING_ACCEPTANCE" || userStatus == "ACTIVE") {
            console.log("Before throw error");
            // handleNext(5);

            setErrorMsg("This CNIC has already been registered.");
            // throw new Error("This CNIC has already been registered.");
          } else if (userStatus == "PENDING_PHONE_VERIFICATION") {
            handleNext(1);
          } else if (userStatus == "PENDING_UPLOADS") {
            handleNext(3);
          } else if (userStatus == "PENDING_ANSWERS") {
            handleNext(2);
          } else {
            handleNext(1);
          }
        } catch (error: Error) {
          console.log(error, "Error in verify phone");

          // console.info("Code Not Verified", error);
          // setCodeSent(false);
          // setLoading(false);
          // if (error.toString().includes("PHONE_NR_EXISTS")) {
          //   setErrorMsg(translate("phoneExist"));
          // } else if (error.toString().includes("NATIONAL_ID_EXISTS")) {
          //   setErrorMsg(translate("cnicExist"));
          // } else if (error.toString().includes("PASSPORT_NR_EXISTS")) {
          //   setErrorMsg(translate("passExist"));
          // } else {
          //   setErrorMsg(translate("phoneVerNotWorking"));
          // }
        }
      } else {
        setError({
          cnicError: false,
          passportError: false,
          phoneError: true,
          vCodeError: false,
        });
      }
    }
  }

  const verifyUserWithCode = async (userId: string, vCode: string) => {
    setLoading(true);
    try {
      const register = await registerUser(userId, vCode.toString());
      console.log(register);

      setLoading(false);
      sessionStorage.setItem("vCode", vCode);
      handleNext(2);
    } catch (error) {
      setLoading(false);
      console.info("User Not Regsitered", error);
      if (error.toString().includes("PRECONDITION_FAILED")) {
        setErrorMsg(translate("vCodeError"));
      } else if (error.toString().includes("INVALID_VERIFICATION_CODE")) {
        setErrorMsg(translate("vCodeError"));
      } else if (
        error.toString().includes("user must be a UUID") ||
        error.toString().includes("USER_NOT_FOUND")
      ) {
        setErrorMsg(translate("notValidUser"));
      }
    }
  };

  const loginUserWithPin = async (cnic: string, vCode: string) => {
    setLoading(true);
    try {
      let token = await getToken(cnic, vCode);
      sessionStorage.setItem("loginToken", token.access_token);
      sessionStorage.setItem("userCnic", cnic);
      sessionStorage.setItem("vCode", vCode);

      setLoading(false);
      return token;
    } catch (error) {
      console.info(error);
      // props.setAuthenticated(false);
      setLoading(false);
      if (error.toString().includes("Unauthorized")) {
        setLoginErrMsg(translate("unauthorizeUser"));
      } else if (error.toString().includes("password")) {
        setLoginErrMsg(translate("vCodeError"));
      } else {
        setLoginErrMsg(translate("invalidUser"));
      }
      return null;
    }
  };

  const onButtonClick = () => {
    if (inputFile && inputFile.current) {
      inputFile?.current?.click();
    }
  };

  const convertBase64 = (file: any) => {
    var reader: any;
    return new Promise((resolve, reject) => {
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (reader) {
          resolve(reader.result);
        }
      };
      reader.onerror = function (error: any) {
        reject(error);
      };
    });
  };

  async function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    setfileError("");
    setHasError(false);
    if (input.files?.length) {
      let file = input.files[0];
      if (input.files[0].size > 10000000) {
        setErrorMsgImg(translate("largeSize"));

        // setErrorMsgImg("Allowed file is 10MB's");
        setHasError(true);
      } else {
        try {
          const base64: any = await convertBase64(file);
          setDisplayImg(base64);
          const compressedFile = await imageCompression(file, options);
          setUserImgFile(file);
        } catch (error) {
          console.info(error);
        }
      }
    } else {
      setHasError(true);
      setErrorMsgImg(translate("uploadPic"));
    }
  }

  async function verifyUserImage() {
    if (!userImgFile) {
      setHasError(true);
      setErrorMsgImg(translate("uploadPic"));
    } else {
      console.log(userImgFile, "IMAGE");
      try {
        let res = await uploadImg(userImgFile);
        console.log(res);

        sessionStorage.setItem("userImg", userImgFile);
        handleNext(4);
      } catch (error) {
        console.log(error);

        if (error.toString().includes("ERR_INVALID_ARG_TYPE")) {
          setErrorMsgImg(translate("invalidImg"));
        } else if (error.toString().includes("large")) {
          setErrorMsgImg(translate("largeSize"));
        } else {
          setErrorMsgImg(translate("errorInUploadingImg"));
        }
      }
    }
  }
  return {
    verifyUserWithCode,
    verifyPhone,
    cnic,
    passport,
    phone,
    ans1,
    ans2,
    cnicError,
    passportError,
    phoneError,
    activeStep,
    handleNext,
    setState,
    setAns,
    vCodeError,
    handleBack,
    errorMsg,
    loginUserWithPin,
    loginErrMsg,
    setError,
    verifyUserImage,
    handlechange,
    userImgFile,
    setUserImgFile,
    errorMsgImg,
    displayImg,
    setDisplayImg,
    loading,
    setVerCode,
    verCode,
    setVerCodeError,
    loginPin,
    loginPinError,
    setLoginPin,
    setLoginPinError,
    setErrorMsgImg,
    setErrorMsg,
  };
}
