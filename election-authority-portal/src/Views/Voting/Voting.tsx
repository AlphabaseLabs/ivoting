import { useState } from "react";
import { connect } from "react-redux";
import StepperComp from "../Stepper/Stepper";
import axios, { AxiosResponse } from "axios";

import "./voting.scss";
import { useVoteStateStore } from "../../Store/admin";
import { getSystemState } from "../../IndexStore/rootAction";
import { useInterval } from "../../helper/UseInterval";
import { DEV_URL } from "../../Constants/apiUrls";
import vote from "../../assets/box.png";

interface Props {
  getSystemState: () => any;
}
interface VotingStateResponse {
  state: string;
  votesSubmitted: number;
  question: string;
}
function Voting({ getSystemState }: Props) {
  const { nextState } = useVoteStateStore();
  const [disabled, setDisabled] = useState(true);
  const [votesSubmitted, setVotesSubmitted] = useState<number>(0);
  const [inTransition, setInTransition] = useState<boolean>(false);
  const [moveNext, setMoveNext] = useState<boolean>(false);
  const getState = async (): Promise<void> => {
    try {
      const response: AxiosResponse<VotingStateResponse> = await axios.get(
        `${DEV_URL}/state`
      );

      setVotesSubmitted(response.data.votesSubmitted);
    } catch (error) {
      console.error(error);
    }
  };
  useInterval(() => {
    getState();
  }, 5000);
  const nextStep = async () => {
    try {
      setInTransition(true);
      setInTransition(false);
      getSystemState();
    } catch (error) {
      setInTransition(false);
    }
  };

  return (
    <>
      <div className="main-div flex-col-center">
        <StepperComp onboarding={false} voting={true} results={false} />
        <div className="block-div w-75 my-4">
          <div className="left">Voting Process Ongoing</div>
          <div className="right">Step 1-2</div>
        </div>
        <div className="border-div w-75   mb-3 ">
          {inTransition ? (
            <div className="flex-col-center  ">
              <div className="spin-wrapper">
                <div className="spinner"></div>
              </div>
            </div>
          ) : (
            <div className="circular-stepper-container w-100 flex-col-start ">
              <div>
                <img src={vote} className="side-img mx-3" />
                <h3 className="sub-heading ">
                  {votesSubmitted} Votes Submitted
                </h3>
              </div>
              <div className="flex-col-center w-100 my-3">
                <h3 className="vote-time">Voting is going on</h3>
                <h3 className="vote-desc mb-3">
                  As the time ends, you can click on “Close Vote” Button
                </h3>
                <button
                  className="vote-btn hvr-shutter-in-horizontal"
                  // disabled={votesSubmitted == 0 ? true : false}
                  onClick={nextStep}
                >
                  CLOSE VOTE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <div className="main-div flex-col-center">
        <StepperComp onboarding={false} voting={true} results={false} />

        <div className="block-div w-75 my-4">
          <div className="left">Voting Phase</div>
          <div className="right">Step 2-3</div>
        </div>
        <div className="border-div w-75   mb-5 ">
          <div className="circular-stepper-container w-100 flex-col-start ">
            <h3 className="sub-heading my-4">
              Now you can open vote by clicking on button below
            </h3>
            <button className="vote-btn hvr-shutter-in-horizontal">
              OPEN VOTE
            </button>
          </div>
        </div>
        <div className="block-div w-75 mb-3  ">
          <div className="right">
            <button className="disabled-btn ">
           
              Next Step
              <br />
              Voting Phase
          
            </button>
          </div>
        </div>
      </div> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Voting);
