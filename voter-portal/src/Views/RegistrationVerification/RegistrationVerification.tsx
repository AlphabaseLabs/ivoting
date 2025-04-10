//@ts-nocheck
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Hidden,
  Alert,
  CircularProgress,
} from "@mui/material";
import InputMask from "react-input-mask";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";

import translate from "../../i18n/translate";
import { FlexBox, FlexColCenter } from "../elements";
import { ErrorTypo, InputLabel, SubHeading } from "../../pages/pagesElements";

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
  verCode: any;
  setVerCode: any;
  verifyUserWithCode: any;
  vCodeError: boolean;
  handleBack: any;
  systemLang: string;
  vCodeErrorMsg: string;
  loading: boolean;
}

function RegistrationVerification({
  verCode,
  setVerCode,
  verifyUserWithCode,
  vCodeError,
  handleBack,
  systemLang,
  vCodeErrorMsg,
  loading,
}: IProps) {
  let userPhone: any = sessionStorage.getItem("userPhone");
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState<any>("");

  const handleSubmit = () => {
    if (verCode === "" || verCode == null || !verCode.match(/^[0-9]{6}$/)) {
      setErrorMsg(translate("vCodeError"));
    } else {
      let userId = sessionStorage.getItem("uuid");
      verifyUserWithCode(userId, verCode);
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Hidden smDown>
        <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
          <SubHeading>{translate("phoneVerHeader")}</SubHeading>
        </FlexBox>
      </Hidden>
      <Hidden smUp>
        <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
          <Typography variant="body2">{translate("phoneVerHeader")}</Typography>
        </FlexBox>
      </Hidden>

      <FlexBox
        mt={2}
        display="flex"
        $direction={systemLang == "en-US" ? "start" : "end"}
      >
        <InputLabel variant="subtitle1">
          {translate("phoneVerSubHeader", { value: userPhone })}
        </InputLabel>
      </FlexBox>

      <Box mt={2}>
        <InputMask
          mask="  9   9   9   9   9   9"
          maskChar=""
          value={verCode}
          onChange={(v) => setVerCode(v.target.value.replace(/\s/g, ""))}
          onFocus={() => setErrorMsg("")}
        >
          {() => (
            <TextField
              sx={{
                backgroundColor: "#E4F2EF",
                paddingTop: 1,
              }}
              variant="standard"
              error={vCodeError}
              InputProps={{ classes }}
              fullWidth
              required
              size="small"
            />
          )}
        </InputMask>
        {errorMsg && (
          <ErrorTypo
            color="error"
            variant="caption"
            sx={{ fontWeight: "bold" }}
          >
            {translate("vCodeError")}
          </ErrorTypo>
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
              sx={{ fontSize: "16px" }}
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
            onClick={() => {
              handleSubmit();
            }}
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
      {vCodeErrorMsg && (
        <FlexColCenter mt={5}>
          <Alert severity="error" sx={{ textAlign: "center" }}>
            {vCodeErrorMsg}
          </Alert>
        </FlexColCenter>
      )}
    </Box>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};

export default connect(mapStateToProps, null)(RegistrationVerification);
