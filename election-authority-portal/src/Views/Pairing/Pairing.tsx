import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
import StepperComp from "../Stepper/Stepper";

import { DEV_URL } from "../../Constants/apiUrls";
import { useInterval } from "../../helper/UseInterval";
import {
  checkNumberOfAuthoritiesOnline,
  checkNumberOfSubmittedPublicKeyShares,
  createVote,
} from "../../Services/adminServices";
import "./pairing.scss";
import { useVoteStateStore } from "../../Store/admin";
import { getSystemState } from "../../IndexStore/rootAction";
interface Props {
  signedUpSealers: number;
  requiredSealers: number;
  progress: number;
  updateProgress: (progress: number) => void;
  getSystemState: () => any;
}
function Pairing({
  signedUpSealers,
  progress,
  requiredSealers,
  updateProgress,
  getSystemState,
}: Props) {
  const { nextState } = useVoteStateStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [voteQuestionDeployed, setVoteQuestionDeployed] =
    useState<boolean>(false);
  const [readyForDeployment, setReadyForDeployment] = useState(false);
  const REFRESH_INTERVAL_MS = 5000;
  useEffect(() => {
    checkIfContractDeployed();
  }, []);
  useEffect(() => {
    checkSignedSealers();
  }, []);

  useInterval(
    () => {
      checkSignedSealers();
    },
    signedUpSealers !== requiredSealers ? REFRESH_INTERVAL_MS : 10000000
  );
  const createVoteFunc = async () => {
    try {
      setLoading(true);
      const response = await createVote("Imran Khan v/s Nawaz Shareef");
      console.log("createVoteFunc", response);
      setAddress(response.address);
      setVoteQuestionDeployed(true);
      setLoading(false);
      nextStep();
    } catch (error) {
      console.log(error);
    }
  };
  const nextStep = async () => {
    try {
      getSystemState();
      // handleNext(newState.state);
    } catch (error) {
      console.log(error);
    }
  };
  const checkSignedSealers = async () => {
    try {
      const response = await checkNumberOfAuthoritiesOnline();
      if (response.signedUpSealers == requiredSealers) {
        updateProgress(66);
        setReadyForDeployment(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfContractDeployed = async (): Promise<void> => {
    try {
      const response = await axios.get(`${DEV_URL}/deploy`);
      //   console.log(response);

      if (response.status === 200 && response.data.address !== "") {
        console.log(response);
        setVoteQuestionDeployed(true);
        setAddress(response.data.address);
        const state: AxiosResponse<any> = await axios.get(`${DEV_URL}/state`);
      } else {
        setVoteQuestionDeployed(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StepperComp onboarding={true} voting={false} results={false} />
      <div className="block-div w-75 my-4">
        <div className="left">Pairing</div>
        <div className="right">Step 2-3</div>
      </div>
      <div className="border-div w-75 flex-col-center mb-3 ">
        {loading ? (
          <div className="flex-col-center  spin-wrapper">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="circular-stepper-container w-100 flex-col-center ">
              <div style={{ width: 150, height: "auto" }}>
                <CircularProgressbar
                  value={signedUpSealers == requiredSealers ? 66 : 33}
                  maxValue={100}
                  text={`${signedUpSealers == requiredSealers ? 66 : 33}%`}
                />
              </div>
            </div>

            <button
              disabled={!readyForDeployment}
              className={
                readyForDeployment ? "next-btn mt-3" : "disabled-btn mt-3"
              }
              onClick={createVoteFunc}
            >
              Upload Candidate List
            </button>
          </>
        )}
      </div>
      <div className="block-div w-75 mb-3  ">
        <div className="right">
          <button
            className={progress != 100 ? "disabled-btn " : "next-btn "}
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
export default connect(mapStateToProps, mapDispatchToProps)(Pairing);
