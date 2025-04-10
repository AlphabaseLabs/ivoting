// @ts-nocheck
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Container,
} from "@mui/material";
import { indexStore } from "../../Store/indexStore";
import SignIn from "../SignIn/SignIn";
import PartialVoteCasted from "../PartialVoteCasted/PartialVoteCasted";
import "./cast.scss";
import VoteCasted from "../VoteCasted/VoteCasted";
import VotingPanel from "../VotingPanel/VotingPanel";
import RecastVote from "../RecastVote/RecastVote";
import { getIsAuthenticated, getIsTokenSet } from "../../Store/rootAction";
// import { Container } from "react-bootstrap";

function CastVote(props: any) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [tokenSet, SetToken] = useState<boolean>(false);
  const [constituency, setConstituency] = useState<string>("National Assembly");
  const [display, setDisplay] = useState<string>("NA");
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = ["Enter CNIC Number", "Enter Voting PIN", "Security Questions"];
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    props.getIsAuthenticated();
    props.getIsTokenSet();
  }, []);
  useEffect(() => {
    setAuthenticated(props.isAuthenticated);
    SetToken(props.isTokenSet);
  }, [props.isAuthenticated, props.isTokenSet, props.contractAddress]);
  const voterState = indexStore();
  const nextStep = (constituency: string) => {
    setDisplay(constituency);
    setConstituency(
      constituency === "NA" ? "National Assembly" : "Provincial Assembly"
    );
  };
  const getState = () => {
    let vote = sessionStorage.getItem("voteTx");
    if (vote != null && vote != "") {
      console.info(vote);
      return <VoteCasted nextStep={nextStep} />;
    } else if (authenticated && tokenSet) {
      switch (display) {
        case "RecastVote":
          return <RecastVote />;
        case "NA":
          return (
            <VotingPanel nextStep={nextStep} constituency={constituency} />
          );
        case "Partial":
          return <PartialVoteCasted nextStep={nextStep} />;
        case "PA":
          return (
            <VotingPanel
              nextStep={nextStep}
              constituency={constituency}
              second={true}
            />
          );
        case "Done":
          return <VoteCasted nextStep={nextStep} />;
        default:
          return (
            <VotingPanel nextStep={nextStep} constituency={constituency} />
          );
      }
    } else {
      return <SignIn />;
    }
  };

  return (
    <>
      {/* <Box>
        <Typography variant="h5" color="primary">
          VOTING PORTAL
        </Typography>
      </Box> */}
      {/* <Box width="60vw" mt={4} mb={4}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box> */}
      <Container maxWidth="md">
        {/* {getState()} */}
        <VotingPanel nextStep={nextStep} constituency={constituency} />
        {/* <VoteCasted nextStep={nextStep} /> */}
      </Container>
      {/* <RecastVote /> */}

      {/* <VotingPanel nextStep={nextStep} constituency={constituency} /> */}
      {/* <PartialVoteCasted nextStep={nextStep} /> */}
      {/* <VoteCasted nextStep={nextStep} />; */}
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.rootReducer.isAuthenticated,
    isTokenSet: state.rootReducer.isTokenSet,
    voteTx: state.rootReducer.voteTx,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getIsAuthenticated: () => dispatch(getIsAuthenticated()),
    getIsTokenSet: () => dispatch(getIsTokenSet()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CastVote);
