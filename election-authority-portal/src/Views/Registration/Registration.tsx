import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import StepperComp from "../Stepper/Stepper";

import "./register.scss";
import "react-circular-progressbar/dist/styles.css";
import { DEV_URL } from "../../Constants/apiUrls";
import { useVoteStateStore } from "../../Store/admin";
import { getSystemState } from "../../IndexStore/rootAction";
interface Props {
  requiredSealers: number;
  progress: number;
  getSystemState: () => any;
  updateProgress: (progress: number) => void;
}
function Registration({
  requiredSealers,
  progress,
  getSystemState,
  updateProgress,
}: Props) {
  const { nextState } = useVoteStateStore();
  const size = "400";
  const steps = [{ title: "" }, { title: "" }, { title: "" }];

  const [sealers, setSealers] = useState<string[]>([]);
  const [allSealersConnected, setAllSealersConnected] = useState(false);
  useEffect(() => {
    const events = new EventSource(`${DEV_URL}/registered`);
    events.onmessage = (event): void => {
      const parsedData = JSON.parse(event.data);
      setSealers((sealers) =>
        sealers
          .concat(parsedData)
          .filter((element, index, arr) => arr.indexOf(element) === index)
      );
    };
    return () => {
      events.close();
    };
  }, []);

  useEffect(() => {
    if (sealers.length === requiredSealers) {
      nextStep();
    }
  }, [sealers, requiredSealers]);

  const nextStep = async () => {
    updateProgress(33);
    try {
      getSystemState();
      // handleNext(newState.state);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StepperComp onboarding={true} voting={false} results={false} />
      <div className="block-div w-75 my-3">
        <div className="left">Address Registration</div>
        <div className="right">Step 1-3</div>
      </div>
      <div className="border-div w-75 flex-col-center mb-3 ">
        <div className="circular-stepper-container w-100 flex-col-center ">
          <div style={{ width: 150, height: "auto" }}>
            <CircularProgressbar
              value={sealers.length == requiredSealers ? 33 : progress}
              maxValue={3}
              text={`${sealers.length == requiredSealers ? 33 : progress}%`}
            />
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
