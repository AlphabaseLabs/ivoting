// @ts-nocheck
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import done from "../../assets/requestSentDone.svg";
import translate from "../../i18n/translate";
import { MsgHeading } from "../elements";

function RequestSent({ handleNext }) {
  let status = sessionStorage.getItem("status");
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      sx={{ minHeight: "550px" }}
    >
      <Box mt={8} display="flex" justifyContent="center" alignContent="center">
        <img height={50} width={50} src={done} alt="loading..." />
      </Box>
      <Box mt={3} display="flex" justifyContent="center" alignContent="center">
        <Typography
          align="center"
          color="secondary"
          variant="h4"
          sx={{ fontWeight: "bold" }}
        >
          {status == "ACTIVE" ? translate("reqSent") : translate("reqPending")}
        </Typography>
      </Box>
      <Box mt={3} display="flex" justifyContent="center" alignContent="center">
        <MsgHeading align="center">{translate("reqSentDesc")}</MsgHeading>
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
  );
}

export default RequestSent;
