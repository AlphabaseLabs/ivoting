import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import countryCode from "../../assets/countryCode.svg";
import {
  Button,
  TextField,
  Typography,
  Box,
  Hidden,
  Alert,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import signInFirst from "../../assets/signInFirst.svg";
import translate from "../../i18n/translate";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { FlexBox, FlexColCenter } from "../elements";
import { ErrorTypo, InputLabel } from "../../pages/pagesElements";
import { setAuthenticated, setToken } from "../../Store/rootAction";
import { resetPin } from "../../Services/eIdentityProviderService";
import SpeedDialComp from "../../components/SpeedDialComp/SpeedDialComp";

const useStyles = makeStyles({
  underline: {
    "&:before": {
      borderBottom: "none",
    },
    "&:hover": {
      borderBottom: "none",
    },
  },
});

// interface IProps {
//   handleNext: (stateElement: string) => void;
// }

function SignInForm({
  loginUserWithPin,
  systemLang,
  loginErrMsg,
  cnic,
  vCode,
  setVerCode,
  setState,
  setToken,
  setAuthenticated,
  handleNext,
  loading,
}: any) {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [resetError, setResetError] = useState<string>("");
  const [sucessMsg, setSuccessMsg] = useState<any>("");

  const [vCodeError, setvCodeError] = useState<boolean>(false);
  const [cnicError, setCnicError] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  const handleClickDrop = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDrop = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const handleSubmit = async () => {
    if (
      cnic == "" ||
      cnic == null ||
      !cnic.match(/^[0-9]{5}-[0-9]{7}-[0-9]$/)
    ) {
      setCnicError(true);
    } else if (vCode == null || !vCode.match(/^[0-9]{6}$/)) {
      setvCodeError(true);
    } else {
      try {
        let logindata = await loginUserWithPin(cnic, vCode);
        if (logindata) {
          handleNext(1);
          setAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleReset = async () => {
    if (!cnic || !cnic.match(/^[0-9]{5}-[0-9]{7}-[0-9]$/)) {
      setCnicError(true);
    } else {
      try {
        let data = await resetPin(cnic);
        setSuccessMsg(translate("votingPinSent"));
      } catch (error) {
        console.log(error);
        setResetError(String(translate("invalidCnic")));
      }
    }
  };
  const resetErrorMsgs = () => {
    setCnicError(false);
    setSuccessMsg("");
    setResetError("");
  };
  return (
    <>
      <Hidden smDown>
        <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
          <Typography variant="h6" color="secondary">
            {translate("regStepperStepOne")}
          </Typography>
        </FlexBox>
      </Hidden>
      <Hidden smUp>
        <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
          <Typography variant="body2">
            {translate("regStepperStepOne")}
          </Typography>
        </FlexBox>
      </Hidden>

      <Box mt={3}>
        <FlexBox
          mb={1}
          display="flex"
          $direction={systemLang == "en-US" ? "start" : "end"}
        >
          <InputLabel>
            {translate("regCnicInput")}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
        </FlexBox>

        <InputMask
          mask="  9  9  9  9  9  -  9  9  9  9  9  9  9  -  9"
          value={cnic}
          onChange={(v) =>
            setState({
              cnic: v.target.value.replace(/\s/g, ""),
            })
          }
          onFocus={resetErrorMsgs}
        >
          {() => (
            <TextField
              sx={{
                backgroundColor: "#E4F2EF",
              }}
              variant="standard"
              fullWidth
              placeholder="  3  5  2  0  0  -  1  2  5  4  0  8  8  -  6 "
              InputProps={{ classes }}
              error={cnicError}
              required
            />
          )}
        </InputMask>
        {cnicError && (
          <ErrorTypo variant="caption">{translate("cnicError")}</ErrorTypo>
        )}
      </Box>

      <Box mt={3}>
        <FlexBox mb={1} $direction={systemLang == "en-US" ? "start" : "end"}>
          <InputLabel>
            {translate("loginStepperStepTwo")}
            <span style={{ color: "red" }}>*</span>
          </InputLabel>
        </FlexBox>

        <InputMask
          mask="  9   9   9   9   9   9"
          value={vCode}
          onChange={(v) => setVerCode(v.target.value.replace(/\s/g, ""))}
          onFocus={() => setvCodeError(false)}
        >
          {() => (
            <TextField
              fullWidth
              variant="standard"
              sx={{
                backgroundColor: "#E4F2EF",
              }}
              placeholder="  x   x   x   x   x   x"
              InputProps={{ classes }}
              error={vCodeError}
              required
              size="small"
            />
          )}
        </InputMask>
        {vCodeError && (
          <ErrorTypo variant="caption">{translate("vCodeError")}</ErrorTypo>
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
              // width: 150,
              color: "#0CAE7D",
              border: "1px solid #0CAE7D",
              borderRadius: "8px",
            }}
            variant="outlined"
            onClick={handleReset}
          >
            <Typography
              variant="caption"
              color="secondary"
              sx={{ fontSize: "14px", fontWeight: "bold" }}
            >
              {translate("resend")}
            </Typography>
          </Button>
        </Box>

        <Box mt={4}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
            sx={{ height: 45, width: 100 }}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Typography
                sx={{ textTransform: "none" }}
                variant="body2"
                color="common.white"
              >
                {translate("nextBtn")}
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
      {loginErrMsg && (
        <FlexColCenter mt={5}>
          <Alert severity="error" sx={{ textAlign: "center" }}>
            {loginErrMsg}
          </Alert>
        </FlexColCenter>
      )}
      {resetError && (
        <FlexColCenter mt={5}>
          <Alert severity="error" sx={{ textAlign: "center" }}>
            {resetError}
          </Alert>
        </FlexColCenter>
      )}
      {sucessMsg && (
        <FlexColCenter mt={5}>
          <Alert severity="success" sx={{ textAlign: "center" }}>
            {sucessMsg}
          </Alert>
        </FlexColCenter>
      )}
      <Box display="flex" width="100%" justifyContent="start" mt={2} mb={4}>
        <Hidden mdDown>
          <img width={250} src={signInFirst} alt="SignIn" />
          <Box width="100%" display="flex" justifyContent="end">
            <SpeedDialComp />
          </Box>
        </Hidden>
      </Box>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAuthenticated: (flag: boolean) => dispatch(setAuthenticated(flag)),
    setToken: (token: string) => dispatch(setToken(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
