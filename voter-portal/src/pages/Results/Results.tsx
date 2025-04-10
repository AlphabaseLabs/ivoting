import { Box, Hidden, Paper } from "@mui/material";

import HeaderMain from "../../components/Header/Header";
import UseCheckState from "../../Hooks/useCheckState";
import ResultComp from "../../Views/ResultComp/ResultComp";
import SpeedDialComp from "../../components/SpeedDialComp/SpeedDialComp";

function Results(props: any) {
  return (
    <>
      <HeaderMain />
      <Hidden smDown>
        <Box display="flex" pt={2} mb={2} justifyContent="center">
          <Paper
            elevation={8}
            sx={{
              minHeight: "93vh",
              width: "95vw",
            }}
          >
            <ResultComp />
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
            elevation={8}
            sx={{
              minHeight: "93vh",
              width: "95vw",
              boxShadow: "none",
              borderRadius: "40px",
              border: "10px solid white",
            }}
          >
            <ResultComp />
          </Paper>
        </Box>
      </Hidden>
    </>
  );
}

export default Results;
