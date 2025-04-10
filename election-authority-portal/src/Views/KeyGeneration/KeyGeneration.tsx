import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { connect } from "react-redux";

import { DEV_URL } from "../../Constants/apiUrls";
import { useInterval } from "../../helper/UseInterval";
import {
  checkNumberOfAuthoritiesOnline,
  checkNumberOfSubmittedPublicKeyShares,
  createVote,
} from "../../Services/adminServices";
import StepperComp from "../Stepper/Stepper";
import axios, { AxiosResponse } from "axios";
import { getSystemState } from "../../IndexStore/rootAction";
interface Props {
  signedUpSealers: number;
  progress: number;
  updateProgress: (progressValue: number) => void;
  getSystemState: () => any;
  requiredSealers: number;
}
interface PublicKeyPostResponse {
  msg: string;
  publicKey: number;
}
function KeyGeneration({ signedUpSealers, getSystemState }: Props) {
  const delay = (t: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, t));

  const [submittedKeyShares, setSubmittedKeyShares] = useState<number>(0);
  const [allKeySharesSubmitted, setAllKeySharesSubmitted] =
    useState<boolean>(false);
  const [requiredKeyShares, setRequiredKeyShares] = useState<number>(3);
  const [publicKey, setPublicKey] = useState<number>(0);
  const [publicKeyGenerated, setPublicKeyGenerated] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(66);

  const REFRESH_INTERVAL_MS = 4000;
  useEffect(() => {
    apiCall();
  }, []);
  async function apiCall() {
    let response = await checkNumberOfSubmittedPublicKeyShares();
    // console.log(response);
    setRequiredKeyShares(response.requiredKeyShares);
    setSubmittedKeyShares(response.submittedKeyShares);
  }

  useEffect(() => {
    if (requiredKeyShares === submittedKeyShares) {
      setAllKeySharesSubmitted(true);
    }
  }, [requiredKeyShares, submittedKeyShares]);
  useInterval(
    () => {
      apiCall();
    },
    !allKeySharesSubmitted ? REFRESH_INTERVAL_MS : 0
  );
  const generatePublicKey = async (): Promise<void> => {
    try {
      const response: AxiosResponse<PublicKeyPostResponse> = await axios.post(
        `${DEV_URL}/publickey`,
        {}
      );

      if (response.status === 201) {
        setPublicKey(response.data.publicKey);
        setPublicKeyGenerated(true);
        setProgress(100);

        await delay(500);
      } else {
        throw new Error(
          `GET /state. Status Code: ${response.status} -> not what was expected.`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const taskCompleted = async () => {
    await getSystemState();
  };
  return (
    <>
      <StepperComp onboarding={true} voting={false} results={false} />
      <div className="block-div w-75 my-4">
        <div className="left">Key Generation</div>
        <div className="right">Step 3-3</div>
      </div>
      <div className="border-div w-75 flex-col-center mb-3 ">
        <div className="circular-stepper-container w-100 flex-col-center ">
          <div style={{ width: 150, height: "auto" }}>
            <CircularProgressbar
              value={requiredKeyShares == submittedKeyShares ? 100 : 66}
              maxValue={100}
              text={`${requiredKeyShares == submittedKeyShares ? 100 : 66}%`}
            />
          </div>
        </div>
        <button
          className={
            allKeySharesSubmitted ? "next-btn mt-3" : "disabled-btn mt-3"
          }
          onClick={generatePublicKey}
          disabled={!allKeySharesSubmitted ? true : false}
        >
          Generate Public Key
        </button>
      </div>
      <div className="block-div w-75 mb-3  ">
        <div className="right">
          <button
            className={progress != 100 ? "disabled-btn " : "next-btn "}
            onClick={taskCompleted}
            disabled={progress != 100 ? true : false}
          >
            Next Step
            <br />
            Voting Phase
          </button>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemState: state.rootReducer.currentState,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSystemState: () => dispatch(getSystemState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(KeyGeneration);
