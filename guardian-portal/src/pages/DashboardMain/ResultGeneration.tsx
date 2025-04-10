import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import MainLayout from "../../components/MainLayout/MainLayout";
import {
  decryptShare,
  getContext,
  keyCeremony,
  submitTally,
  tallyDecrpy,
  tallyEncrypt,
  startTally,
} from "../../Services/resultGeneration";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ResultGeneration({ type }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [tallyData, setTallyData] = useState();
  const [contextData, setContextData] = useState();
  const [startTallyData, setStartTallyData] = useState();

  const history = useHistory();

  const stepsLabel = [
    "Start Tally",
    "Get Tally",
    "Compute Tally Decryption Share",
    "Decrypt Tally",
  ];

  const steps = [
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          try {
            setLoading(true);
            let resStartTally = await startTally();
            setStartTallyData(resStartTally);
            setLoading(false);
            setActiveStep(1);
          } catch (error: Error) {
            setMessage(error.message);
            setError(true);
            setLoading(false);
          }
        }}
      >
        Start Tally
      </Button>
    </Box>,
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          setLoading(true);
          try {
            // let resGetTally: any = await tallyEncrypt(startTallyData);
            // setTallyData(resGetTally);
            let resContext: any = await getContext();
            setContextData(resContext.elections[0].context);
            setLoading(false);

            setActiveStep(2);
          } catch (error: Error) {
            setMessage(error.message);
            setError(true);
            setLoading(false);
          }
        }}
      >
        Tally Encrypt
      </Button>
    </Box>,

    <Box>
      <Button
        onClick={async () => {
          setLoading(true);
          try {
            let resKeyCeremony = await keyCeremony();
            let guardianId = "1";
            let resDecryptShare = await decryptShare(
              contextData,
              startTallyData,
              guardianId
            );

            let resShareSubmit = await submitTally(resDecryptShare.shares[0]);
            console.log(resDecryptShare.shares[0], "SUBMIT TALLY DATA");
            setLoading(false);

            setActiveStep(3);
          } catch (error: Error) {
            setMessage(error.message);
            setError(true);
            setLoading(false);
          }
        }}
        variant="contained"
        color="primary"
      >
        Compute Tally Decryption Share
      </Button>
    </Box>,
    <Box>
      <Button
        onClick={async () => {
          setLoading(true);
          try {
            let resTallyDecryt = await tallyDecrpy(startTallyData);
            localStorage.setItem(
              "decrypted_tally",
              JSON.stringify(resTallyDecryt.tallies[0])
            );
            setLoading(false);

            history.push("/election-contest/result");
          } catch (error: Error) {
            setMessage(error.message);
            setError(true);
            setLoading(false);
          }
        }}
        variant="contained"
        color="primary"
      >
        Decrypt Tally
      </Button>
    </Box>,
  ];

  return (
    console.log(
      startTallyData,
      "START TALLY DATA",
      tallyData,
      "TALLY DATA",
      contextData,
      "CONTEXT DATA"
    ),
    (
      <>
        <MainLayout topBar={true}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            style={{ color: "#00B07B" }}
          >
            {stepsLabel.map((label, index) => {
              return (
                <Step key={index}>
                  <StepLabel>
                    <Typography>{stepsLabel[index]}</Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Box
            width="100%"
            m={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {steps[activeStep]}
          </Box>

          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={() => setError(false)}
          >
            <Alert
              onClose={() => setError(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </MainLayout>
      </>
    )
  );
}

export default ResultGeneration;
