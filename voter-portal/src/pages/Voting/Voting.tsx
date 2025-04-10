// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Container, Box, Paper, Hidden, CircularProgress } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { getWeb3Node } from "../../Util/getWeb3";
import HeaderMain from "../../components/Header/Header";
import VoteCasted from "../../Views/VoteCasted/VoteCasted";
import SpeedDialComp from "../../components/SpeedDialComp/SpeedDialComp";
import { connectToContract } from "../../Services/accessProviderService";
import VotingScreen from "../../Views/VotingScreen/VotingScreen";
import UseCheckState from "../../Hooks/useCheckState";
import { getUserDetail } from "../../Services/eIdentityProviderService";
import { electionAbi } from "../../contracts/election";

export const VotingMain: React.FC<{}> = () => {
  const [constituency, setConstiturncy] = useState([]);
  // const [steps, setStep] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const getConstituency = async () => {
    try {
      let res: any = await getUserDetail();
      setConstiturncy(res.elections);

      setloading(false);
      return res.uuid;
    } catch (error) {
      // setErrorMsg()
    }
  };

  const checkUserVote = async () => {
    try {
      const uuidUser = sessionStorage.getItem("uuid");

      var Web3 = await getWeb3Node();

      const electionContract = await connectToContract(
        electionAbi,
        process.env.REACT_APP_ELECTION_CONTRACT_ADRESS 
      );

      let voterData = await electionContract.methods
        .getVoter(Web3.utils.sha3(uuidUser))
        .call();

      console.log("voterData: ", voterData);
      if (
        voterData.elections.length > 0 &&
        voterData.votes.length > 0 &&
        voterData.elections.length === voterData.votes.length
      ) {
        history.push("/Voting?step=vote-casted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const gettingData = async () => {
      await getConstituency();
      await checkUserVote();
    };
    gettingData();
  }, []);

  let query = useQuery();
  const stepsRoute = [
    "national-assembly-voting",
    "provisional-assembly-voting",
    "vote-casted",
  ];

  useEffect(() => {
    stepsRoute.map((val, index) => {
      if (val === query.get("step")) {
        setActiveStep(index);
      }
    });
  }, [query]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (type: string) => {
    // setVotingState(type);
    history.push("/Voting?step=" + stepsRoute[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };

  const steps = [];
  // <VotingScreen
  //   header="National Assembly Voting"
  //   headerId="NAVoting"
  //   handleNext={handleNext}
  //   blue={false}
  //   assembly="NA"
  //   styleId="NA"
  //   constituency="NA-53-contest"
  //   objectId="NA-53-contest"
  // />,
  // <VotingScreen
  //   header="Provisional Assembly Voting"
  //   headerId="PAVoting"
  //   handleNext={handleNext}
  //   blue={true}
  //   assembly="PA"
  //   styleId="NA"
  //   constituency="PB-1-contest"
  //   objectId="PB-1-contest"
  // />,
  constituency.map((item, index) => {
    return steps.push(
      <VotingScreen
        header={
          item.includes("NA")
            ? "National Assembly Voting"
            : "Provisional Assembly Voting"
        }
        headerId={item.includes("NA") ? "NAVoting" : "PAVoting"}
        handleNext={handleNext}
        blue={item.includes("NA") ? false : true}
        assembly={item.includes("NA") ? "NA" : "PA"}
        styleId="NA"
        constituency={item}
        objectId={item}
      />
    );
  });
  steps.push(<VoteCasted nextStep={handleNext} />);
  // setStep(stepsInit);
  // ];

  return (
    // console.log(steps.length, "STEPSSS"),
    <>
      <HeaderMain />
      <Hidden smDown>
        <Box display="flex" pt={8} justifyContent="center">
          <Paper
            elevation={9}
            sx={{
              minHeight: "93vh",
              width: "95vw",
              boxShadow: "none",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              height="85vh"
              alignItems="center"
            >
              {/* {getPage()} */}
              <Container maxWidth="lg">{steps[activeStep]}</Container>
              <Hidden smDown>
                <Box width="100%" display="flex" justifyContent="end">
                  <SpeedDialComp />
                </Box>
                {/* <Box position="absolute" right={40} bottom={10}>
                  <img height={60} width={60} src={helpline} alt="helpline" />
                </Box> */}
              </Hidden>
            </Box>
          </Paper>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box
          display="flex"
          pt={7}
          justifyContent="center"
          sx={{ backgroundColor: "#EAF4F2" }}
        >
          <Paper
            sx={{
              width: "95vw",
              boxShadow: "none",
              borderTopLeftRadius: "40px",
              borderTopRightRadius: "40px",
              border: "10px solid white",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              height="85vh"
              alignItems="flex-start"
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <Container maxWidth="md">{steps[activeStep]}</Container>
              )}
            </Box>
          </Paper>
        </Box>
      </Hidden>
    </>
  );
};
