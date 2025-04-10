import React, { useState } from "react";
import vote from "../../assets/box.png";
import "./update.scss";
import axios, { AxiosResponse } from "axios";
import { DEV_URL } from "../../Constants/apiUrls";
import { useInterval } from "../../helper/UseInterval";
import { useVoteStateStore } from "../../Store/admin";
interface Props {
  handleNext: () => void;
}
interface VotingStateResponse {
  state: string;
  votesSubmitted: number;
  question: string;
}

function VotingUpdate({ handleNext }: Props) {
  const { nextState } = useVoteStateStore();
  const [disabled, setDisabled] = useState(true);
  const [votesSubmitted, setVotesSubmitted] = useState<number>(0);
  const [inTransition, setInTransition] = useState<boolean>(false);
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
      await nextState();
      setInTransition(false);
      handleNext();
    } catch (error) {
      setInTransition(false);
    }
  };
  return (
    <>
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
              <h3 className="sub-heading ">{votesSubmitted} Votes Submitted</h3>
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
    </>
  );
}

export default VotingUpdate;
