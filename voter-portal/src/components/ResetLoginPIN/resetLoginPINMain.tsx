// @ts-nocheck
import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import ResetLoginForm from "./resetLoginForm";
import HeaderMain from "../Header/Header";
import helpline from "../../assets/helpline.svg";
import RequestSent from "../../Views/RequestSent/RequestSent";
import translate from "../../i18n/translate";
import done from "../../assets/requestSentDone.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { resetPin } from "../../Services/eIdentityProviderService";

export default function ResetLoginPINMain() {
  const history = useHistory();
  const [data, setData] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    let userCnic = sessionStorage.getItem("userCnic");
    try {
      let data = await resetPin(userCnic);
      setData(translate("votingPinSent"));
    } catch (error) {
      console.log(error);
      setData(translate("invalidCnic"));
      setError(true);
    }
  };
  const handleNext = () => {
    sessionStorage.clear();
    history.push("/Signin");
  };
  const steps = [
    <ResetLoginForm handleNext={handleNext} />,
    <RequestSent handleNext={handleNext} />,
  ];

  return (
    <>
      <HeaderMain />
      <Box display="flex" pt={3} mb={3} justifyContent="center" alignItems="center">
        <Paper
          elevation={8}
          sx={{
            minHeight: "90vh",
            width: "95vw",
            justifyContent: "center",
            alignItems: "center",
            display:"flex"
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
          >
            <Box
              mt={8}
              display="flex"
              justifyContent="center"
              alignContent="center"
            >
              <img height={50} width={50} src={done} alt="loading..." />
            </Box>
            <Box
              mt={3}
              display="flex"
              justifyContent="center"
              alignContent="center"
            >
              <Typography align="center" color="secondary" variant="h4">
                {data}
              </Typography>
            </Box>
            {!error && (
              <Box
                mt={3}
                display="flex"
                justifyContent="center"
                alignContent="center"
              >
                <Typography align="center" variant="body2">
                  {translate("checkMob")}
                </Typography>
              </Box>
            )}

            <Box width="100%" display="flex" justifyContent="center" mt={4}>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                onClick={handleNext}
              >
                <Typography
                  sx={{ textTransform: "none" }}
                  variant="body2"
                  color="common.white"
                >
                  {translate("exitBtn")}
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box
            mt={15}
            display="flex"
            flexDirection="column"
            height="85vh"
            alignItems="center"
          ></Box>
        </Paper>
      </Box>
    </>
  );
}
