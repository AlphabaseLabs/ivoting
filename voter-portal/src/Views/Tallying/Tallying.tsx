// @ts-nocheck
import tick from "../../assets/loading.gif";
// import "./tally.scss";
import { Box, Typography } from "@mui/material";

function Tallying() {
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="center">
          <Typography>
            Please wait while the results are being tallied
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center">
          <img src={tick} className="imgNew" alt="Loading" />
        </Box>
      </Box>
      {/* <div className="row flex-col-center w-100">
        <div className="col-xxl-6 col-xl-7 col-lg-10 col-md-10 col-sm-12 col-xs-12 w-100 flex-col-center ">
          <h2
            className="tally-heading mt-5 mb-3"
            style={{ textAlign: "center" }}
          >
            Please wait while the results are being tallied
          </h2>
          <img src={tick} className="imgNew" alt="Loading" />
        </div>
      </div> */}
    </>
  );
}

export default Tallying;
