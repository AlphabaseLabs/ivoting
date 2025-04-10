import React, { useState, useEffect } from "react";
import { connectToContract } from "../Services/accessProviderService";
import { electionAbi } from "../contracts/election";
import { useHistory } from "react-router";

export default function UseCheckState(currentState: any, route: any) {
  const history = useHistory();
  const [state, setstate] = useState();

  useEffect(() => {
    async function checkState() {
      const electionContract = await connectToContract(
        electionAbi,
        process.env.REACT_APP_ELECTION_CONTRACT_ADRESS || ""
      );
      let contractState = await electionContract.methods
        .getElectionStateString()
        .call();
      // setCurrentState(contractState);
      setstate(contractState);
      console.log("STATEEEEEE", contractState !== currentState);

      if (contractState !== currentState) {
        // history.push(route);
      }
    }

    checkState();
  }, []);

  return { state };
}
