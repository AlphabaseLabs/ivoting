// @ts-nocheck
import React, { useState } from "react";
import "./selectcast.scss";
import { AreaLabel } from "../../components/AreaLabel";
import { Typography, Box, Button } from "@mui/material";

interface IProps {
  nextStep(votingArea: string): void;
}
function SelectConstituency({ nextStep }: IProps) {
  const handleClick = (votingArea: string) => {
    nextStep(votingArea);
  };

  const [value, setValue] = useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <>
      <Box mt={4} display="flex" flexDirection="column" justifyContent="center">
        <Box>
          <AreaLabel />
        </Box>

        <Box mt={4}>
          <Typography align="center" variant="h5">
            Select Constituency to recast vote
          </Typography>
        </Box>

        <Box mt={4}>
          <Box display="flex" justifyContent="center" flexGrow={1}>
            <Button
              sx={{
                backgroundColor: value === 0 && "green",
              }}
              onClick={() => {
                setValue(0);
                handleClick("NA");
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: value === 0 ? "white" : "black" }}
              >
                National Assembly
              </Typography>
            </Button>
            <Button
              sx={{
                backgroundColor: value === 1 && "green",
              }}
              onClick={() => {
                setValue(1);
                handleClick("PA");
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: value === 1 ? "white" : "black" }}
              >
                Provisional Assembly
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>

      {/* <div
        className="img-div flex-col-center w-100  "
        style={{ backgroundColor: "white" }}
      >
        <div className="row flex-col-center w-100">
          <div className="bg-green  my-4  flex-col-center">
            <h4 className="details">NA-54, Islamabad-III</h4>
            <h4 className="details">ISLAMABAD MODEL SCHOOL (I-V) G-11/1</h4>
          </div>

          <h2 className="para-heading my-4" style={{ textAlign: "center" }}>
            Select Constituency to recast vote
          </h2>
          <div className="flex-row-center my-5 w-50">
            <div className="col-md-6 ">
              <button
                className="form-btn  w-100 "
                onClick={() => handleClick("NA")}
              >
                National Assembly
                <i className="fas fa-arrow-right  mx-3"></i>
              </button>
            </div>
            <div className="col-md-6">
              <button className="white-btn" onClick={() => handleClick("PA")}>
                Provincial Assembly
                <i className="fas fa-arrow-right  mx-3"></i>
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default SelectConstituency;
