// @ts-nocheck
import React from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Hidden,
} from "@mui/material";

import HeaderMain from "../../components/Header/Header";
import UseRegistrationMain from "../Registration/UseRegistrationMain";
import { useHistory } from "react-router";
import translate from "../../i18n/translate";
import { HeadingTypo, StepTypo } from "../pagesElements";
import SpeedDialComp from "../../components/SpeedDialComp/SpeedDialComp";

import SignInVerification from "../../Views/SignIn/SignInVerification";
import SignInQuestions from "../../Views/SignInQuestions/SignInQuestions";
import SignInForm from "../../Views/SignIn/SignInForm";
import RequestSent from "../../Views/RequestSent/RequestSent";

import UseCheckState from "../../Hooks/useCheckState";

export const SignIn: React.FC<{}> = () => {
  const stepsRoute = ["enter-CNIC-number", "voting-pin", "security-questions"];
  const history = useHistory();
  const {
    handleNext,
    cnic,
    ans1,
    ans2,
    setAns,
    activeStep,
    verifyPhone,
    cnicError,
    setState,
    setVerCode,
    verCode,
    vCodeError,
    handleBack,
    errorMsg,
    loginUserWithPin,
    loginErrMsg,
    setVerCodeError,
    loginPin,
    loginPinError,
    setLoginPin,
    setLoginPinError,
    loading,
  } = UseRegistrationMain(stepsRoute, "SignIn");

  const { state } = UseCheckState("VOTING", "/");

  const stepsLabel = [
    "Enter CNIC Number",
    "Verify Login Pin",
    "Security Questions",
  ];
  const stepsId = [
    "loginStepperStepOne",
    "loginStepperStepTwo",
    "regStepperStepFour",
  ];
  const steps = [
    <SignInForm
      loginUserWithPin={loginUserWithPin}
      cnic={cnic}
      vCode={verCode}
      setVerCode={setVerCode}
      cnicError={cnicError}
      setState={setState}
      loginErrMsg={loginErrMsg}
      handleNext={handleNext}
      loading={loading}
    />,
    <SignInVerification
      handleNext={handleNext}
      loginPin={loginPin}
      loginPinError={loginPinError}
      setLoginPin={setLoginPin}
      vCodeError={vCodeError}
      handleBack={handleBack}
      setLoginPinError={setLoginPinError}
    />,
    <SignInQuestions
      handleNext={handleNext}
      handleBack={handleBack}
      ans1={ans1}
      ans2={ans2}
      setAns={setAns}
    />,
    // <Questions handleNext={handleNext} signIn={true} />,
  ];

  return (
    console.log(state, "STATEEEEEkddkkdkddkdk"),
    (
      <>
        <HeaderMain />
        <Hidden smDown>
          <Box
            display="flex"
            py={4}
            justifyContent="center"
            alignItems="center"
            // sx={{ backgroundColor: "#D3D3D3" }}
          >
            <Paper elevation={8} sx={{ width: "96%" }}>
              <Box
                display="flex"
                flexDirection="column"
                // height="85vh"
                alignItems="center"
              >
                {activeStep < 3 && (
                  <>
                    <Box>
                      <Typography mt={2} variant="h5" color="primary">
                        {translate("loginHeader")}
                      </Typography>
                    </Box>
                    <Box width={{ lg: "60vw", md: "80vw" }} mt={4} mb={4}>
                      <Stepper alternativeLabel activeStep={activeStep}>
                        {stepsLabel.map((label, index) => {
                          return (
                            <Step key={index}>
                              <StepLabel>
                                <StepTypo>{translate(stepsId[index])}</StepTypo>
                              </StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Box>
                  </>
                )}

                {/* {getPage()} */}
                <Container maxWidth="sm">
                  {steps[activeStep]}
                  {activeStep >= 4 && <RequestSent handleNext={handleNext} />}
                </Container>
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
                <Box width="100%">
                  <HeadingTypo mt={2} variant="h5" color="primary">
                    {translate("loginHeader")}
                  </HeadingTypo>
                </Box>

                <Container maxWidth="sm">
                  {steps[activeStep]}
                  {activeStep >= 4 && <RequestSent handleNext={handleNext} />}
                </Container>
              </Box>
            </Paper>
          </Box>
        </Hidden>
      </>
    )
  );
};
