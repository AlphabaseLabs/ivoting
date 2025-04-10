//@ts-nocheck

import { connect } from "react-redux";
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Hidden,
} from "@mui/material";
import translate from "../../i18n/translate";
import InputMask from "react-input-mask";
import { makeStyles } from "@mui/styles";
import verificationLogo from "../../assets/signInVerification.svg";
import { FlexColCenter } from "../elements";
import { InputLabel } from "../../pages/pagesElements";

const useStyles = makeStyles({
  underline: {
    "&:after": {
      borderBottom: "none",
    },
    "&:before": {
      borderBottom: "none",
    },
    "&:hover": {
      borderBottom: "none",
    },
  },
});

interface IProps {
  vCode: any;
  systemLang: string;
  setVerCode: any;
  handleNext: any;
  vCodeError: boolean;
  handleBack: any;
  setVerCodeError: any;
  loginPin: any;
  setLoginPin: any;
  loginPinError: any;
  setLoginPinError: any;
}

function RSignInVerification({
  loginPin,
  systemLang,
  setLoginPin,
  loginPinError,
  setLoginPinError,
  handleNext,
  vCodeError,
  handleBack,
}: IProps) {
  const classes = useStyles();
  const handleBtnClick = () => {
    if (loginPin === "" || loginPin == null || !loginPin.match(/^[0-9]{4}$/)) {
      setLoginPinError(true);
    } else {
      handleNext(2);
    }
  };
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Typography
          align={systemLang == "en-US" ? "start" : "end"}
          color="secondary"
          variant="h6"
        >
          {translate("signVotingPin")}
        </Typography>
      </Box>

      <Box
        mt={3}
        display="flex"
        justifyContent={systemLang == "en-US" ? "start" : "end"}
      >
        <InputLabel variant="body2">
          {/* Enter the 4-digit code sent to you at +92333542987 */}
          {translate("signPhoneVerSubHeader")}
        </InputLabel>
      </Box>

      <Box mt={2}>
        <InputMask
          mask="9  9  9  9"
          maskChar=""
          onChange={(v) => setLoginPin(v.target.value.replace(/\s/g, ""))}
        >
          {() => (
            <TextField
              sx={{
                backgroundColor: "#E4F2EF",
                paddingTop: 1,
                paddingLeft: 1,
                paddingRight: 1,
              }}
              variant="standard"
              error={loginPinError}
              InputProps={{ classes }}
              fullWidth
              required
              size="small"
            />
          )}
        </InputMask>

        {loginPinError && (
          <FlexColCenter mt={5}>
            <Alert severity="error" sx={{ textAlign: "center" }}>
              {translate("vCodeError")}
            </Alert>
          </FlexColCenter>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        // alignItems="center"
      >
        <Box mt={4}>
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "white",
              borderColor: "#8F9D99",
              height: 45,
              width: 100,
              color: "#0CAE7D",
              border: "1px solid #0CAE7D",
              borderRadius: "8px",
            }}
            variant="outlined"
            onClick={handleBack}
          >
            <Typography
              variant="caption"
              color="secondary"
              sx={{ fontSize: "14px", fontWeight: "bold" }}
            >
              {translate("backBtn")}
            </Typography>
          </Button>
        </Box>

        <Box mt={4}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleBtnClick}
            sx={{ height: 45, width: 100 }}
          >
            <Typography
              sx={{ textTransform: "none" }}
              variant="body2"
              color="common.white"
            >
              {translate("nextBtn")}
            </Typography>
          </Button>
        </Box>
      </Box>
      {/* {!!vCode.match(/^[0-9]{4}$/) && handleSubmit()} */}

      <Box
        // position="absolute"
        // left={60}
        // bottom={40}
        mb={2}
        // display={{ xs: "none", md: "block", lg: "block" }}
      >
        <Hidden mdDown>
          <img height={300} width={350} src={verificationLogo} alt="helpline" />
        </Hidden>
      </Box>
    </Box>
  );
}
const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.rootReducer.isAuthenticated,
    isTokenSet: state.rootReducer.isTokenSet,
    systemLang: state.rootReducer.systemLanguage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getIsAuthenticated: () => dispatch(getIsAuthenticated()),
    getIsTokenSet: () => dispatch(getIsTokenSet()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RSignInVerification);
