import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Header from "../Header/Header";
import divHeader from "../../assets/ecpBorder.svg";
import {
  checkNumberOfAuthoritiesOnline,
  getRequiredValidators,
} from "../../Services/adminServices";
import { VotingState, VOTE_STATES } from "../../Constants/enum";
import { useVoteStateStore } from "../../Store/admin";
import Registration from "../Registration/Registration";
import Pairing from "../Pairing/Pairing";

import { getSystemState } from "../../IndexStore/rootAction";
import KeyGeneration from "../KeyGeneration/KeyGeneration";
import Voting from "../Voting/Voting";
import Tallying from "../Tallying/Tallying";
import VotingResults from "../VotingResults/VotingResults";

function AppWrapper(props: any) {
  const { setState } = useVoteStateStore();
  const [progress, setProgress] = useState<number>(0);
  const [signedUpSealers, setSignedUpSealers] = useState<number>(0);
  const [activeStep, setActivestep] = useState<string>(
    VotingState.REGISTRATION
  );
  const [requiredSealers, setRequiredSealers] = useState<number>(3);
  useEffect(() => {
    callTogetRequiredValidators();
    return () => {};
  }, []);
  useEffect(() => {
    setActivestep(props.systemState);
  }, [props.systemState]);
  const callTogetRequiredValidators = async () => {
    try {
      const response = await getRequiredValidators();
      setRequiredSealers(response.requiredSealers);
      setState(response.state);
      setActivestep(response.state);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProgress = (updatedProgress: number) => {
    setProgress(updatedProgress);
  };
  (async function handleNext() {
    try {
      const response = await checkNumberOfAuthoritiesOnline();
      console.log("I need to be called", response);
      setSignedUpSealers(response.signedUpSealers);
    } catch (error) {
      console.log(error);
    }
  })();

  const getStep = (step: string): React.ReactNode => {
    console.log("ACTIVE STEP IN ADMIN APP WRAPPER: ", step);
    switch (step) {
      case VotingState.REGISTRATION:
        return (
          <Registration
            requiredSealers={requiredSealers}
            progress={progress}
            updateProgress={updateProgress}
          />
        );
      case VotingState.PAIRING:
        return (
          <Pairing
            signedUpSealers={signedUpSealers}
            requiredSealers={requiredSealers}
            progress={progress}
            updateProgress={updateProgress}
          />
        );
      case VotingState.KEY_GENERATION:
        return (
          <KeyGeneration
            signedUpSealers={signedUpSealers}
            requiredSealers={requiredSealers}
            progress={progress}
            updateProgress={updateProgress}
          />
        );
      case VotingState.VOTING:
        return <Voting />;
      case VotingState.TALLYING:
        return <Tallying />;
      case VotingState.RESULT:
        return <VotingResults />;

      default:
        return (
          <div>
            <h1>APP WRAPPER Error: Step {step} doesn&apos;t exist!</h1>
          </div>
        );
    }
  };
  return (
    <>
      <Header />
      <div className="app-section flex-col-center  ">
        <div className="row flex-col-center w-100 g-0">
          <div className="col-xxl-6 col-lg-9 col-md-9 col-sm-11 flex-col-center ">
            <img src={divHeader} className="absolute-img d-none d-sm-block" />
          </div>
        </div>
        <div className="row flex-col-center w-100 no-gutters g-0">
          <div className="col-xxl-6 col-lg-9 col-md-9 col-sm-11">
            <div className="main-div flex-col-center">
              {getStep(activeStep)}
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
