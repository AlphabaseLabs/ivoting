// @ts-nocheck
import React, { useState } from "react";
import { indexStore } from "../../Store/indexStore";
import PartialVoteCasted from "../PartialVoteCasted/PartialVoteCasted";
import SelectConstituency from "../SelectConstituency/SelectConstituency";
import SignIn from "../SignIn/SignIn";
import VoteCasted from "../VoteCasted/VoteCasted";
import VotingPanel from "../VotingPanel/VotingPanel";

export default function RecastVote() {
  const [isvoteCastedNA, setVoteCastedNA] = useState<boolean>(false);
  const [isvoteCastedPA, setVoteCastedPA] = useState<boolean>(false);
  const [constituency, setConstituency] = useState<string>("National Assembly");
  const [display, setDisplay] = useState<string>("RecastVote");
  console.info("hellllo");

  const voterState = indexStore();
  const nextStep = (constituency: string) => {
    setDisplay(constituency);
    setConstituency(
      constituency == "NA" ? "National Assembly" : "Provincial Assembly"
    );
  };
  const getState = () => {
    if (voterState.isVoteTxSet()) {
      return <VoteCasted nextStep={nextStep} />;
    } else if (voterState.getIsAuthenticated() && voterState.isTokenSet()) {
      switch (display) {
        case "RecastVote":
          return <SelectConstituency nextStep={nextStep} />;
        case "NA":
          return (
            <VotingPanel nextStep={nextStep} constituency={constituency} />
          );
        case "Partial":
          return <VoteCasted nextStep={nextStep} />;
        case "PA":
          return (
            <VotingPanel nextStep={nextStep} constituency={constituency} />
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
      {getState()}
      {/* <SelectConstituency nextStep={nextStep} /> */}
      {/* <VotingPanel nextStep={nextStep} constituency={constituency} /> */}
    </>
  );
}
