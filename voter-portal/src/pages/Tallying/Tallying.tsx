// @ts-nocheck
import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import done from "../../assets/requestSentDone.svg";
import translate from "../../i18n/translate";
import { MsgHeading } from "../../Views/elements";
import HeaderMain from "../../components/Header/Header";
import UseCheckState from "../../Hooks/useCheckState";

function Tallying({ handleNext }) {
  UseCheckState("TALLYING", "/SignIn");
  return (
    <>
      <HeaderMain />
      <Box display="flex" pt={8} justifyContent="center">
        {/* <Paper elevation={8} sx={{ width: "98vw", height: "93vh" }}> */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            sx={{ minHeight: "550px" }}
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
              <Typography
                align="center"
                color="secondary"
                variant="h4"
                sx={{ fontWeight: "bold" }}
              >
                {translate("tallyInProgress")}
              </Typography>
            </Box>
            <Box
              mt={3}
              display="flex"
              justifyContent="center"
              alignContent="center"
            >
              <MsgHeading align="center">{translate("tallyDesc")}</MsgHeading>
            </Box>

            <Box width="100%" display="flex" justifyContent="center" mt={4}>
              <Button
                size="large"
                color="secondary"
                variant="contained"
                type="submit"
                sx={{ borderColor: "#8F9D99" }}
                onClick={() => {
                  window.location = "/Register";
                  // handleNext(0);
                  sessionStorage.clear();
                }}
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
        {/* </Paper> */}
      </Box>
    </>
  );
}

export default Tallying;
