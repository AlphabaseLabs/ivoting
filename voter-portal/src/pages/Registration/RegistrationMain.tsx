// @ts-nocheck
import HeaderMain from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SpeedDialComp from "../../components/SpeedDialComp/SpeedDialComp";
import { VotingTimer } from "../../components/VotingTiming/VotingTimer";

import Register from "../../Views/Register/Register";
import RegistrationVerification from "../../Views/RegistrationVerification/RegistrationVerification";
import Questions from "../../Views/Questions/Questions";
import UploadPicture from "../../Views/UploadPicture/UploadPicture";
import RequestSent from "../../Views/RequestSent/RequestSent";

import UseRegistrationMain from "../Registration/UseRegistrationMain";
import translate from "../../i18n/translate";
import { HeadingTypo, StepTypo, TopHeading } from "../pagesElements";

import { connect } from "react-redux";
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

function RegistrationMain(props: any) {
  const stepsRoute = [
    "enter-your-details",
    "verify-phone-number",
    "security-questions",
    "upload-picture",
    "request-sent",
  ];

  const {
    verifyUserWithCode,
    handleNext,
    cnic,
    passport,
    phone,
    ans1,
    ans2,
    setAns,
    activeStep,
    verifyPhone,
    cnicError,
    passportError,
    phoneError,
    setState,
    vcode,
    vCodeError,
    handleBack,
    errorMsg,
    loginUserWithPin,
    setError,
    verifyUserImage,
    handlechange,
    userImgFile,
    setUserImgFile,
    errorMsgImg,
    displayImg,
    setDisplayImg,
    loading,
    setVerCode,
    verCode,
    setErrorMsgImg,
    setErrorMsg,
  } = UseRegistrationMain(stepsRoute, "Register");

  const stepsLabel = [
    "Enter Your Details",
    "Verify Phone Number",
    "Security Questions",
    "Upload Picture",
  ];
  const stepsId = [
    "regStepperStepOne",
    "regStepperStepTwo",
    "regStepperStepFour",
    "regStepperStepThree",
  ];
  const steps = [
    <Register
      loading={loading}
      setError={setError}
      verifyPhone={verifyPhone}
      errorMsg={errorMsg}
      handleNext={handleNext}
      cnic={cnic}
      passport={passport}
      phone={phone}
      cnicError={cnicError}
      passportError={passportError}
      phoneError={phoneError}
      setState={setState}
    />,
    <RegistrationVerification
      verifyUserWithCode={verifyUserWithCode}
      vCodeErrorMsg={errorMsg}
      vCodeError={vCodeError}
      handleBack={handleBack}
      setVerCode={setVerCode}
      verCode={verCode}
      loading={loading}
    />,
    <Questions
      handleNext={handleNext}
      handleBack={handleBack}
      ans1={ans1}
      ans2={ans2}
      setAns={setAns}
    />,
    <UploadPicture
      verifyUserImage={verifyUserImage}
      handlechange={handlechange}
      displayImg={displayImg}
      setDisplayImg={setDisplayImg}
      setFile={setUserImgFile}
      userImgFile={userImgFile}
      errorMsg={errorMsgImg}
      handleBack={handleBack}
      setError={setErrorMsgImg}
    />,
  ];

  return (
    <>
      <HeaderMain />
      <Hidden smDown>
        <Box
          display="flex"
          py={4}
          justifyContent="center"
          // sx={{ backgroundColor: "#D3D3D3" }}
        >
          <Paper elevation={8} sx={{ width: "96%" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {activeStep < 4 && (
                <>
                  <Box>
                    <TopHeading mt={2} variant="h5" color="primary">
                      {translate("topHeading")}
                    </TopHeading>
                  </Box>
                  <Box width={{ lg: "45vw", md: "80vw" }} mt={4} mb={4}>
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

              <Container maxWidth="sm">
                <Box width="100%" sx={{ minHeight: "450px" }}>
                  {steps[activeStep]}
                  {activeStep >= 4 && <RequestSent handleNext={handleNext} />}
                </Box>
              </Container>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Box ml={2} mb={2}>
                  {/* <VotingTimer /> */}
                </Box>
                <Box mr={2} mb={2}>
                  <SpeedDialComp />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Hidden>

      <Hidden smUp>
        <Box
          display="flex"
          pt={8}
          justifyContent="center"
          sx={{ backgroundColor: "#EAF4F2" }}
        >
          <Paper
            sx={{
              width: "95vw",
              boxShadow: "none",
              borderRadius: "40px",
              border: "10px solid white",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              minHeight="83vh"
              alignItems="flex-start"
            >
              <Box
                width="100%"
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <HeadingTypo mt={2} variant="h5" color="primary">
                  {translate("topHeading")}
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
      <Hidden smUp>
        <Footer />
      </Hidden>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};

export default connect(mapStateToProps, null)(RegistrationMain);
