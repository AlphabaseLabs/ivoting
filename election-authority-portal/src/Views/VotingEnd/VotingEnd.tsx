import React, { useState } from "react";
import vote from "../../assets/box.png";
function VotingEnd(props: any) {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <div className="block-div w-75 my-4">
        <div className="left">Voting Phase</div>
        <div className="right">Step 2-3</div>
      </div>
      <div className="border-div w-75   mb-3 ">
        <div className="circular-stepper-container w-100 flex-col-start ">
          <div>
            <img src={vote} className="side-img mx-3" />
            <h3 className="sub-heading ">25699 Votes Submitted</h3>
          </div>
          <div className="flex-col-center w-100 my-3">
            <h3 className="vote-time">Voting Session Ended</h3>
            <h3 className="vote-desc mb-3">
              Please click the “Close Vote” Button and proceed to next step
            </h3>
            <button className="vote-btn hvr-shutter-in-horizontal">
              CLOSE VOTE
            </button>
          </div>
        </div>
      </div>
      <div className="block-div w-75 mb-3  ">
        <div className="right">
          <button className={disabled ? "disabled-btn " : "next-btn"}>
            Next Step
            <br />
            Tallying Phase
          </button>
        </div>
      </div>
    </>
  );
}

export default VotingEnd;
