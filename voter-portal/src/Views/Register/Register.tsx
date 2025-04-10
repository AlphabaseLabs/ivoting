// @ts-nocheck
import translate from "../../i18n/translate";
import { FlexBox, FlexColCenter } from "../elements";
import { ErrorTypo, InputLabel, SubHeading } from "../../pages/pagesElements";
import countryCode from "../../assets/countryCode.svg";

import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Backdrop,
  Menu,
  Divider,
  Hidden,
  Alert,
  Input,
} from "@mui/material";
import InputMask from "react-input-mask";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { connect } from "react-redux";
import { useRef } from "react";
import React from "react";

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

function Register({
  handleNext,
  verifyPhone,
  cnic,
  passport,
  phone,
  cnicError,
  passportError,
  phoneError,
  setState,
  systemLang,
  errorMsg,
  setError,
  loading,
}: any) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const cnicRef = useRef();

  const handleClickDrop = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDrop = () => {
    setAnchorEl(null);
  };

  const onFocusHandle = () => {
    setError({
      cnicError: false,
      passportError: false,
      phoneError: false,
      vCodeError: false,
    });
  };

  return (
    <>
      <FlexBox $direction={systemLang == "en-US" ? "start" : "end"}>
        <Hidden smDown>
          <SubHeading>{translate("regStepperStepOne")}</SubHeading>
        </Hidden>
        <Hidden smUp>
          <FlexBox mt={1} $direction={systemLang == "en-US" ? "start" : "end"}>
            <Typography variant="body2">{translate("regHeader")}</Typography>
          </FlexBox>
        </Hidden>
      </FlexBox>

      <Box mt={3}>
        <FlexBox
          $direction={systemLang == "en-US" ? "start" : "end"}
          mb={1}
          display="flex"
        >
          <InputLabel>
            {translate("regCnicInput")} <span style={{ color: "red" }}>*</span>
          </InputLabel>
        </FlexBox>

        <InputMask
          mask="   9  9  9  9  9  -  9  9  9  9  9  9  9  -  9 "
          alwaysShowMask={false}
          value={cnic}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onFocus={onFocusHandle}
          maskChar=""
          onChange={(v) =>
            setState({
              cnic: v.target.value.replace(/\s/g, ""),
              passport,
              phone,
            })
          }
        >
          {() => (
            <TextField
              fullWidth
              variant="standard"
              sx={{
                backgroundColor: "#E4F2EF",
                paddingTop: 0.5,
              }}
              placeholder="  3  5  2  0  0  -  1  2  5  4  0  8  8  -  6"
              InputProps={{ classes }}
              error={cnicError}
              required
              size="large"
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
            {translate("regPassInput")} <span style={{ color: "red" }}>*</span>
          </InputLabel>
        </FlexBox>

        <InputMask
          mask="   *  *  *  *  *  *  *  *  *"
          maskChar=""
          alwaysShowMask={false}
          value={passport}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onFocus={onFocusHandle}
          onChange={(v) =>
            setState({
              cnic,
              passport: v.target.value.replace(/\s/g, ""),
              phone,
            })
          }
        >
          {() => (
            <TextField
              fullWidth
              variant="standard"
              placeholder="   W  D  2  0  0  3  4  9  9"
              InputProps={{ classes }}
              sx={{
                backgroundColor: "#E4F2EF",
                paddingTop: 0.5,
              }}
              error={passportError}
              required
              size="medium"
            />
          )}
        </InputMask>
        {passportError && (
          <ErrorTypo variant="caption">{translate("passError")}</ErrorTypo>
        )}
      </Box>

      <Box mt={3}>
        <FlexBox
          mb={1}
          display="flex"
          $direction={systemLang == "en-US" ? "start" : "end"}
        >
          <InputLabel>
            {translate("regPhoneInput")} <span style={{ color: "red" }}>*</span>
          </InputLabel>
        </FlexBox>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: "#E4F2EF",
          }}
        >
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickDrop}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <img height={25} width={25} src={countryCode} alt="country code" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseDrop}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseDrop}>
              <Box
                mr={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  height={25}
                  width={25}
                  src={countryCode}
                  alt="country code"
                />
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                Pakistan
              </Box>
            </MenuItem>
          </Menu>

          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{ backgroundColor: "#00B07B" }}
          />

          <InputMask
            mask="9  9  9  9  -  9  9  9  9  9  9  9  "
            maskChar=""
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            value={phone}
            onFocus={onFocusHandle}
            onChange={(v) =>
              setState({
                cnic,
                passport,
                phone: v.target.value.replace(/\s/g, ""),
              })
            }
          >
            {() => (
              <TextField
                fullWidth
                variant="standard"
                sx={{
                  backgroundColor: "#E4F2EF",
                  paddingLeft: 1,
                  paddingRight: 1,
                  paddingTop: 0.5,
                }}
                error={phoneError}
                InputProps={{ classes }}
                placeholder="  0  3  3  3  -  0  9  7  2  3  4  4"
                required
                size="medium"
              ></TextField>
            )}
          </InputMask>
        </Box>

        {phoneError && (
          <ErrorTypo variant="caption">{translate("phoneError")}</ErrorTypo>
        )}
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        mt={4}
      >
        <Button
          size="large"
          color="secondary"
          variant="contained"
          onClick={async () => {
            try {
              console.log("Error is occuring");

              await verifyPhone();
            } catch (error) {
              console.log(error, "register error");
            }
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
      {errorMsg && (
        <FlexColCenter mt={5}>
          <Alert severity="error" sx={{ textAlign: "center" }}>
            {errorMsg}
          </Alert>
        </FlexColCenter>
      )}
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    systemLang: state.rootReducer.systemLanguage,
  };
};

export default connect(mapStateToProps, null)(Register);
