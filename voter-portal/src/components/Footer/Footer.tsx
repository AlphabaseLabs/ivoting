import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { HeadingTypo } from "../../pages/pagesElements";
function Footer(props: any) {
  return (
    <>
      <Toolbar variant="dense" sx={{ backgroundColor: "#EAF4F2" }}>
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="center"
        >
          <AccessTimeIcon />
          <Typography>
            <Typography
              sx={{
                color: "#018A60",
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              &nbsp;54:21&nbsp;
            </Typography>
            mins left till voting starts
          </Typography>
        </Box>
      </Toolbar>
    </>
  );
}

export default Footer;
