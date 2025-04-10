//@ts-nocheck
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Header } from "../components/MainLayout/Header";
import axios from "axios";
import { submitPublicKey } from "../Services/loginServices";
import { useAppProvider } from "../Hooks/useAppProvider";
import { useGetRequest } from "../Hooks/useGetRequest";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DEV_URL, DEV_URL_2 } from "../Constants/apiUrls";
import { StyledButton } from "./elements";
import { electionId } from "../Services";

export interface State extends SnackbarOrigin {
  vertical: string;
  horizontal: string;
}

export const RegistrationPage: React.FC<{}> = ({
  activeStep,
  setactiveStep,
  setLoading,
  setOpenSnackbar,
  setMsgSnackbar,
  stepsRoute,
}) => {
  const [pending, setPending] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>({
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  const { account, errMsg, openErrDialog, publicKeySubmitted } =
    useAppProvider();
  const { sendPublicKey } = useAppProvider();
  const history = useHistory();

  const { response, error, loading, active, total } = useGetRequest(
    `${DEV_URL_2}/api/v1/key/ceremony?key_name=${process.env.REACT_APP_KEY_NAME}`,
    repeat
  );

  // setInterval(() => {
  //   setRepeat(!repeat);
  // }, 25000);

  const sendPublicKeyApi = async () => {
    try {
      setPending(true);
      const response: any = await axios.post(
        `${DEV_URL}/api/v1/key/ceremony/publish?key_name=${process.env.REACT_APP_KEY_NAME}`,
        { election_id: electionId }
      );
      console.log("response", response);
    } catch (e: any) {
      console.log(e);
      setMessage(e);
    }
  };
  // useEffect(() => {
  //   if (response && response.active == response.total && publicKeySubmitted)
  //     history.push("./election-contest");
  //   return () => {};
  // }, [response]);
  return (
    console.log(response, "RES IMP"),
    (
      <>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box p={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                // display="flex"
                sx={{ position: "relative" }}
              >
                <CircularProgress
                  variant="determinate"
                  value={100}
                  color="success"
                  size={150}
                  thickness={1}
                />
                <CircularProgress
                  color="success"
                  variant="determinate"
                  value={response ? (active / total) * 100 : 0}
                  sx={{
                    position: "absolute",
                    right: 0,
                  }}
                  size={150}
                  thickness={1}
                />
              </Box>

              <Box
                position="absolute"
                // top={300}
                mt={5}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                // alignItems="center"
              >
                <Typography align="center" variant="h5">
                  {response ? active + "/" + total : "0 / 0"}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Members registered
                </Typography>
              </Box>

              <Box mt={1} mb={2}>
                <Typography align="center" variant="subtitle1">
                  Please wait for all the members to register, this will take a
                  few minutes.
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <StyledButton
                // disabled={response && active == total ? false : true}
                size="large"
                color="secondary"
                variant="contained"
                sx={{ height: 45 }}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await sendPublicKey(
                      response["key_ceremonies"][0]["elgamal_public_key"],
                      response["key_ceremonies"][0]["commitment_hash"]
                    );
                    // await sendPublicKeyApi();
                    history.push(
                      "/dashboard?step=" + stepsRoute[activeStep + 1]
                    );
                    setactiveStep(activeStep + 1);

                    setLoading(false);
                  } catch (error: Error) {
                    setLoading(false);
                    setOpenSnackbar(true);
                    setMsgSnackbar(error.message);
                  }
                }}
              >
                {pending ? (
                  <CircularProgress sx={{ color: "#fff" }} />
                ) : (
                  <Typography
                    sx={{ textTransform: "none" }}
                    variant="body2"
                    color="common.white"
                  >
                    Submit Public Key
                  </Typography>
                )}
              </StyledButton>
            </Box>
          </Box>
        </Box>
        {/* </Paper> */}
        {/* </Box> */}

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={3000}
          open={openErrDialog}
          message={errMsg}
          onClose={() => setOpen(false)}
        >
          <Alert severity="error">{errMsg}</Alert>
        </Snackbar>
      </>
    )
  );
};
