import React from "react";
import StepperComp from "../Stepper/Stepper";

function StartVoting(props: any) {
  return (
    <>
      <div className="main-div flex-col-center">
        <StepperComp onboarding={false} voting={true} results={false} />

        <div className="block-div w-75 my-4">
          <div className="left">Voting Phase</div>
          <div className="right">Step 1-3</div>
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
      </div>
    </>
  );
}

export default StartVoting;
