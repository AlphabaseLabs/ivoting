import { Alert, Box } from "@mui/material";
import React from "react";

function TopBar(props: any) {
  return (
    <Box mt={8} ml={3} width="100%">
      <Alert
        severity="info"
        icon={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Election will Starts in 45 days
        <br /> Status: Registration
      </Alert>
    </Box>
  );
}

export default TopBar;
