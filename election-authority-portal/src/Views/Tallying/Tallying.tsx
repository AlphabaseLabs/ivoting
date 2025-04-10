import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DEV_URL } from "../../Constants/apiUrls";
import axios, { AxiosResponse } from "axios";
import { useInterval } from "../../helper/UseInterval";
import { getSystemState } from "../../IndexStore/rootAction";
import { connect } from "react-redux";
import StepperComp from "../Stepper/Stepper";

interface TallyStateResponse {
  state: string;
  submittedDecryptedShares: number;
  requiredDecryptedShares: number;
}
function Tallying(props: any) {
  const [submittedDecryptedShares, setSubmittedDecryptedShares] =
    useState<number>(0);
  const [requiredDecryptedShares, setRequiredDecryptedShares] =
    useState<number>(1);
  const [readyForSummary, setReadyForSummary] = useState(false);
  const [inTransition, setInTransition] = useState(false);
  const [moveNext, setMoveNext] = useState<boolean>(false);

  useEffect(() => {
    getState();
  }, []);
  useInterval(() => {
    getState();
  }, 4000);
  useEffect(() => {
    if (submittedDecryptedShares === requiredDecryptedShares) {
      // lastStep();
      setReadyForSummary(true);
      setMoveNext(true);
    }
  }, [submittedDecryptedShares, requiredDecryptedShares]);
  const getState = async (): Promise<void> => {
    try {
      const response: AxiosResponse<TallyStateResponse> = await axios.get(
        `${DEV_URL}/state`
      );
      setSubmittedDecryptedShares(response.data.submittedDecryptedShares);
      setRequiredDecryptedShares(response.data.requiredDecryptedShares);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = async () => {
    props.getSystemState();
  };
  return (
    <>
      <div className="main-div flex-col-center">
        <StepperComp onboarding={false} voting={true} results={false} />
        <div className="block-div w-75 my-4">
          <div className="left">Tallying</div>
        </div>

        <div className="border-div w-75 flex-col-center mb-5 ">
          <div className="circular-stepper-container w-100 flex-col-center  ">
            <div style={{ width: 150, height: "auto" }}>
              <CircularProgressbar
                value={submittedDecryptedShares}
                maxValue={3}
                text={`${submittedDecryptedShares}`}
              />
            </div>
          </div>
        </div>

        <div className="block-div w-75 mb-3  ">
          <div className="right">
            <button
              className={moveNext ? "next-btn" : "disabled-btn"}
              disabled={!moveNext ? true : false}
              onClick={handleClick}
            >
              Next Step
              <br />
              Voting Results
            </button>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Tallying);
