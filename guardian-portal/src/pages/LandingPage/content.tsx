import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { RegistrationPage } from "../RegistrationPage";
import {
  handleVotingStart,
  handleVotingStop,
  handleTallyingStart,
} from "../../Services/votingServices";
import {
  decryptShare,
  getContext,
  submitTally,
  tallyDecrpy,
  startTally,
} from "../../Services/resultGeneration";
import { useAppProvider } from "../../Hooks/useAppProvider";
import { useHistory } from "react-router-dom";

export default function StepsContent({
  activeStep,
  setactiveStep,
  loading,
  setLoading,
  setOpenSnackbar,
  setMsgSnackbar,
  stepsRoute,
}) {
  const { account }: any = useAppProvider();
  const [confirmModal, setConfirmModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tallyData, setTallyData] = useState();
  const [contextData, setContextData] = useState();
  const [startTallyData, setStartTallyData] = useState();

  const history = useHistory();

  const steps = [
    <>
      <Box>
        <RegistrationPage
          activeStep={activeStep}
          setactiveStep={setactiveStep}
          setLoading={setLoading}
          setOpenSnackbar={setOpenSnackbar}
          setMsgSnackbar={setMsgSnackbar}
          stepsRoute={stepsRoute}
        />
      </Box>
      {/* <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="contained"
          onClick={() => {
            handleVotingStart(account);
            setactiveStep(activeStep + 1);
          }}
        >
          Next Stage
        </Button>
      </Box> */}
    </>,
    <>
      <Box>
        <Box>
          <Typography variant="caption">Current Stage:</Typography>
          <Typography variant="h6"> Registration</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Next Stage:</Typography>
          <Typography variant="h6">Voting</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="contained"
          onClick={async () => {
            try {
              setLoading(true);
              await handleVotingStart(account);

              // await handleVotingStop(account);
              history.push("/dashboard?step=" + stepsRoute[activeStep + 1]);

              setactiveStep(activeStep + 1);
              setLoading(false);
            } catch (error: Error) {
              setLoading(false);
              setOpenSnackbar(true);
              setMsgSnackbar(error.message);
            }
          }}
        >
          Next Stage
        </Button>
      </Box>
    </>,
    <>
      <Box>
        <Box>
          <Typography variant="caption">Current Stage:</Typography>
          <Typography variant="h6">Voting</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Next Stage:</Typography>
          <Typography variant="h6">End Voting to Start Tally</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="contained"
          onClick={async () => {
            setLoading(true);
            try {
              await handleVotingStop(account);

              history.push("/dashboard?step=" + stepsRoute[activeStep + 1]);
              setactiveStep(activeStep + 1);
              setLoading(false);
            } catch (error: Error) {
              setLoading(false);
              setOpenSnackbar(true);
              setMsgSnackbar(error.message);
            }
          }}
        >
          Next Stage
        </Button>
      </Box>
    </>,
    <>
      <Box>
        <Box>
          <Typography variant="caption">Current Stage:</Typography>
          <Typography variant="h6">Start Tally</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Next Stage:</Typography>
          <Typography variant="h6">Get Tally</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="contained"
          onClick={async () => {
            try {
              setLoading(true);
              await handleTallyingStart();

              let resStartTally = await startTally();
              setStartTallyData(resStartTally);
              setLoading(false);
              history.push("/dashboard?step=" + stepsRoute[activeStep + 1]);
              setactiveStep(activeStep + 1);
            } catch (error: Error) {
              setLoading(false);
              setOpenSnackbar(true);
              setMsgSnackbar(error.message);
              // throw new Error(error.message);
            }
          }}
        >
          Next Stage
        </Button>
      </Box>
    </>,
    <>
      <Box>
        <Box>
          <Typography variant="caption">Current Stage:</Typography>
          <Typography variant="h6">Start Tally</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Next Stage:</Typography>
          <Typography variant="h6">Get Tally</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="contained"
          onClick={async () => {
            setLoading(true);

            try {
              let resContext: any = await getContext();
              setContextData(resContext.elections[0].context);
              setactiveStep(activeStep + 1);
              history.push("/dashboard?step=" + stepsRoute[activeStep + 1]);
              setLoading(false);
            } catch (error: Error) {
              setLoading(false);
              setOpenSnackbar(true);
              setMsgSnackbar(error.message);
              // throw new Error(error.message);
            }
          }}
        >
          Next Stage
        </Button>
      </Box>
    </>,
    <>
      <Box>
        <Box>
          <Typography variant="caption">Current Stage:</Typography>
          <Typography variant="h6">Get Tally</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Next Stage:</Typography>
          <Typography variant="h6">Compute Tally</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="contained"
          onClick={async () => {
            setLoading(true);
            try {
              // let resKeyCeremony = await keyCeremony();
              let guardianId = process.env.REACT_APP_GUARDIAN_ID;
              let resDecryptShare = await decryptShare(
                contextData,
                startTallyData,
                guardianId
              );

              let resShareSubmit = await submitTally(resDecryptShare.shares[0]);
              // console.log(resDecryptShare.shares[0], "SUBMIT TALLY DATA");

              history.push("/dashboard?step=" + stepsRoute[activeStep + 1]);
              setactiveStep(activeStep + 1);
              setLoading(false);
            } catch (error: Error) {
              setLoading(false);
              setOpenSnackbar(true);
              setMsgSnackbar(error.message);
              // throw new Error(error.message);
            }
          }}
        >
          Next Stage
        </Button>
      </Box>
    </>,
    <>
      <Box>
        <Box>
          <Typography variant="caption">Current Stage:</Typography>
          <Typography variant="h6">Compute Tally</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Next Stage:</Typography>
          <Typography variant="h6">Decrypt Share</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button
          variant="contained"
          onClick={async () => {
            setLoading(true);
            try {
              let resTallyDecryt = await tallyDecrpy(startTallyData);
              localStorage.setItem(
                "decrypted_tally",
                JSON.stringify(resTallyDecryt.tallies[0])
              );
              history.push("/dashboard?step=" + stepsRoute[activeStep + 1]);
              setactiveStep(activeStep + 1);
              setLoading(false);
              // history.push("/election-contest/result");
            } catch (error: Error) {
              setLoading(false);
              setOpenSnackbar(true);
              setMsgSnackbar(error.message);
              setactiveStep(5);

              // throw new Error(error.message);
            }
            setactiveStep(activeStep + 1);
          }}
        >
          Next Stage
        </Button>
      </Box>
    </>,
    <>
      <Box>
        <Box>
          <Typography variant="caption">Current Stage:</Typography>
          <Typography variant="h6">Decrypt Share</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Next Stage:</Typography>
          <Typography variant="h6">Results</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={2}
      >
        <Button variant="contained" onClick={() => history.push("/results")}>
          View Results
        </Button>
      </Box>
    </>,
  ];
  return <Box>{steps[activeStep]}</Box>;
}
