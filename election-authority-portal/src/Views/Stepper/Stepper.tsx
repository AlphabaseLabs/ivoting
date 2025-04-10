import React from "react";
import { useState } from "react";
import "./stepper.scss";
interface StepperProps {
  onboarding: boolean;
  voting: boolean;
  results: boolean;
}
function StepperComp({ onboarding, voting, results }: StepperProps) {
  const [state, seState] = useState({
    stepsArray: [
      {
        title: "Members Onboarding",
        desc: " Public key submission by members",
        complted: false,
        selected: onboarding,
        highlighted: true,
      },
      {
        title: "Voting Phase",
        desc: "    Open Vote and decrypt private keys to see results",
        complted: false,
        selected: voting,
        highlighted: false,
      },
      {
        title: "Voting Results",
        desc: "Voting Results Displayed",
        complted: false,
        selected: results,
        highlighted: false,
      },
    ],
  });

  const stepsDisplay = state.stepsArray.map((item, index) => {
    return (
      <div className="step-wrapper " key={index}>
        <div
          className={
            item.selected ? "step-number step-number-active" : "step-number  "
          }
        >
          {index + 1}
        </div>
        <div className="step-title ">{item.title}</div>
        <div className="step-description ">{item.desc}</div>
        <div
          className={
            index !== state.stepsArray.length - 1 ? "divider-line" : ""
          }
        ></div>
      </div>
    );
  });
  return (
    <div className="stepper-wrapper-horizontal w-100 mt-3 flex-row-center">
      {stepsDisplay}
    </div>
  );
}

export default StepperComp;
